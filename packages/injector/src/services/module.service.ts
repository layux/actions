import 'reflect-metadata';
import {
  MODULE_GLOBAL_METADATA_KEY,
  MODULE_METADATA_KEY,
  MODULE_OPTIONS_METADATA_KEY,
} from '../constants/module.constants';
import { Constructable } from '../types/reflection.types';
import { IModuleOptions } from '../interfaces/module-options.interface';
import { ModuleContainer } from '../models/module-container.model';
import { ProviderService } from './provider.service';
import { ModuleProvider, ProviderToken } from '../types/dependency-injection.types';

export class ModuleService {
  /**
   * Singleton instance of the service
   *
   * @private
   * @static
   * @type {ModuleService}
   */
  private static _instance: ModuleService;

  /**
   * Map of created modules for fast access
   *
   */
  private readonly _createdModules = new Map<string, ModuleContainer>();

  /**
   * Get the singleton instance of the service
   *
   */
  static get instance(): ModuleService {
    if (!ModuleService._instance) ModuleService._instance = new ModuleService();

    return ModuleService._instance;
  }

  /**
   * Get the provider service
   *
   */
  private get providerService(): ProviderService {
    return ProviderService.instance;
  }

  /**
   * Create a module container from a module class
   *
   * @param {Constructable<unknown>} target The module class to create the container from.
   * @param {ModuleContainer} [parentContainer=null] The parent container of the module.
   * @returns {Promise<ModuleContainer>} The created module container.
   * @throws {Error} If the module class is not decorated with `@Module` or there's issue while resolving dependencies.
   */
  async create(
    target: Constructable<unknown>,
    parentContainer: ModuleContainer | null = null
  ): Promise<ModuleContainer> {
    // Validate the class is decorated with @Module
    if (!Reflect.hasMetadata(MODULE_METADATA_KEY, target))
      throw new Error(
        `Module ${target.name} doesn't use @Module decorator and can't be instanciated.`
      );

    // Ensure the module is not already created
    if (this._createdModules.has(target.name))
      throw new Error(`Module ${target.name} has been instanciated already.`);

    // Create the container and start solving dependencies
    const isGlobal = Reflect.hasMetadata(MODULE_GLOBAL_METADATA_KEY, target);
    const options: IModuleOptions = Reflect.getMetadata(MODULE_OPTIONS_METADATA_KEY, target) || {};
    const container = new ModuleContainer(
      target.name,
      options,
      [...(options.providers || [])],
      [],
      new Map(),
      isGlobal,
      parentContainer
    );

    this._createdModules.set(target.name, container);

    // Resolve all imports first because they can solve some dependencies in the current module
    if (options.imports) {
      for (const imported of options.imports) {
        const moduleContainer = await this.create(imported, container);

        container.imports.push(moduleContainer);
      }
    }

    // Resolve providers for this module
    while (container.unresolvedProviders.length) {
      const provider = container.unresolvedProviders.shift();

      if (!provider) break;

      const name = this.providerService.getProviderName(provider);
      const exported = options.exports?.some(
        (exportedProvider) =>
          this.providerService.getProviderName(exportedProvider) === name
      );

      await this.providerService.create(name, provider, container, exported);
    }

    return container;
  }

  /**
   * Check if a module has a provider
   *
   * @param {ModuleContainer} container The module container to check the provider in.
   * @param {ProviderToken} provider The provider token to check.
   * @param {boolean} [unresolved=false] If true, the provider can be in the unresolved providers.
   * @param {boolean} [isCheckingExternally=false] If true, the provider should be exported from the module to pass the check.
   */
  getProvider(
    container: ModuleContainer,
    provider: ProviderToken,
    unresolved = false,
    isCheckingExternally = false
  ): unknown {
    // Check if the provider is directly in the container
    const directProvider = container.get(provider);

    if (directProvider) return directProvider;

    // If we want to check if the provider is uncreated, check if it's in the unresolved providers
    const token = this.providerService.getProviderName(provider);
    const unresolvedProvider =
      unresolved &&
      container.unresolvedProviders.find(
        (p) => this.providerService.getProviderName(p) === token
      );

    if (unresolvedProvider) return unresolvedProvider;

    // Check if the provider is in a child module
    const childrenProvider = container.imports.find((moduleContainer) => {
      const hasProvider = this.getProvider(moduleContainer, provider, unresolved, true);

      if (hasProvider && isCheckingExternally) return moduleContainer.hasProviderExported(provider);

      return hasProvider;
    });

    if (childrenProvider) return childrenProvider;

    // No provider found, throw an error
    throw new Error(`No provider found for ${token} in module ${container.name}.`);
  }
}

export const ModuleFactory = ModuleService.instance;
