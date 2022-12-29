import 'reflect-metadata';
import * as hash from 'object-hash';
import { ModuleProvider, ProviderToken } from '../types/dependency-injection.types';
import { ModuleContainer } from '../models/module-container.model';
import { ModuleService } from './module.service';
import { Provider } from '../models/provider.model';
import { IFactoryProvider } from '../interfaces/factory-provider.interface';
import {
  PROVIDER_INJECT_METADATA_KEY,
  PROVIDER_METADATA_KEY,
  PROVIDER_SCOPE_METADATA_KEY,
} from '../constants/provider.constants';
import { ProviderScope } from '../catalogs/provider-scope.catalog';
import { Constructable } from '../types/reflection.types';

export class ProviderService {
  /**
   * Singleton instance of the service
   *
   */
  private static _instance: ProviderService;

  /**
   * Map of created providers
   *
   * @private
   * @memberof ProviderService
   */
  private readonly createdProviders = new Map<string, Provider>();

  /**
   * Get the singleton instance of the service
   *
   * @returns ProviderService
   */
  static get instance(): ProviderService {
    if (!ProviderService._instance) ProviderService._instance = new ProviderService();

    return ProviderService._instance;
  }

  /**
   * Get the module service
   *
   * @returns ModuleService
   */
  private get moduleService(): ModuleService {
    return ModuleService.instance;
  }

  /**
   * Generic to get the name of a provider from a ModuleProvider or a ProviderToken, when the 'name' property is not available
   * hash the provider to get a unique name
   *
   * @param provider The provider to get the name from
   * @returns string The provider name
   */
  getProviderName(provider: ModuleProvider | ProviderToken): string {
    if (typeof provider === 'function') return provider.name;
    if (typeof provider === 'object' && 'name' in provider) return String(provider.name);

    return hash(provider as never);
  }

  async create(
    name: string,
    provider: ModuleProvider,
    container: ModuleContainer,
    exported = false
  ): Promise<Provider> {
    if (this.createdProviders.has(name))
      throw new Error(`Provider ${name} already exists in ${container.name} module.`);

    // Read scope from the provider, if the provider is a class read it from the metadata
    const scope =
      'scope' in provider && provider.scope
        ? provider.scope
        : typeof provider === 'function'
        ? Reflect.getMetadata(PROVIDER_SCOPE_METADATA_KEY, provider)
        : ProviderScope.Singleton;

    // Get the provider value depending on the provider type
    const value =
      'useValue' in provider
        ? provider.useValue
        : 'useFactory' in provider
        ? await this.createFromFactory(container, provider)
        : typeof provider === 'function' || 'useClass' in provider
        ? await this.createFromClass(
            container,
            'useClass' in provider ? provider.useClass : provider
          )
        : undefined;

    // Create the provider and add it to the created providers map if it's a singleton
    const createdProvider = new Provider(String(provider.name), value, scope, exported);

    if (scope === ProviderScope.Singleton) this.createdProviders.set(name, createdProvider);

    // Add the provider to the container
    container.registerProvider(name, createdProvider);

    // Ensure that the provider doesn't exists in the container.unresolvedProviders
    const unresolvedIndex = container.unresolvedProviders.indexOf(provider);

    if (unresolvedIndex !== -1) container.unresolvedProviders.splice(unresolvedIndex, 1);

    return createdProvider;
  }

  private async createFromFactory(
    container: ModuleContainer,
    provider: IFactoryProvider
  ): Promise<unknown> {
    const parameters = Reflect.getMetadata('design:paramtypes', provider.useFactory) || [];
    const dependencies = await Promise.all(
      parameters.map(async (p: unknown) => this.resolveDependency(p, container))
    );
    const value = await Promise.resolve(provider.useFactory(...dependencies));

    return value;
  }

  private async createFromClass(
    container: ModuleContainer,
    provider: Constructable<unknown>
  ): Promise<unknown> {
    if (!Reflect.hasMetadata(PROVIDER_METADATA_KEY, provider))
      throw new Error(`Provider ${provider.name} is not decorated with @Injectable().`);

    const parameters: Array<unknown> = Reflect.getMetadata('design:paramtypes', provider) || [];
    const dependencies = await Promise.all(
      parameters.map(async (p) => this.resolveDependency(p, container))
    );
    const value = new provider(...dependencies);

    return value;
  }

  /**
   * Resolve a dependency from the container or create it if it's not created yet
   *
   * @param param The dependency to resolve
   * @param container The container to resolve the dependency from
   * @returns Promise<unknown> A promise that resolves to the dependency value
   */
  private async resolveDependency(param: any, container: ModuleContainer): Promise<unknown> {
    // Try to resolve from the container of already created providers
    const targetDependency = Reflect.getMetadata(PROVIDER_INJECT_METADATA_KEY, param) || param;
    console.debug(`Resolving dependency ${targetDependency}...`);
    const containerDependency = container.get(targetDependency);

    if (containerDependency) return containerDependency;

    // Seems like the dependency is not created yet, try to create if it exists in the module
    const provider = this.moduleService.getProvider(container, targetDependency);

    if (provider && this.isUnresolved(provider)) {
      const castedProvider = provider as ModuleProvider;

      return this.create(String(castedProvider.name), castedProvider, container);
    }

    // No luck, throw an error
    throw new Error(`Unable to resolve dependency ${targetDependency.name}.`);
  }

  /**
   * Check if the given value is a unresolved provider
   *
   * @param provider The provider to check
   * @returns boolean True if the provider is unresolved, false otherwise
   */
  private isUnresolved(provider: any): boolean {
    return typeof provider === 'function' || (provider && 'name' in provider);
  }
}
