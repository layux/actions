import { Constructable } from '../types/reflection.types';
import { IModuleOptions } from '../interfaces/module-options.interface';
import { ModuleProvider, ProviderToken } from '../types/dependency-injection.types';
import { Provider } from './provider.model';

export class ModuleContainer {
  constructor(
    private readonly _name: string,
    private readonly _options: IModuleOptions,
    private readonly _unresolvedProviders: Array<ModuleProvider>,
    private readonly _imports: Array<ModuleContainer>,
    private readonly _providers: Map<string, Provider>,
    private readonly _global: boolean = false,
    private readonly _parent: ModuleContainer | null = null
  ) {}

  get name(): string {
    return this._name;
  }

  get options(): IModuleOptions {
    return this._options;
  }

  get unresolvedProviders(): Array<ModuleProvider> {
    return this._unresolvedProviders;
  }

  get imports(): Array<ModuleContainer> {
    return this._imports;
  }

  get global(): boolean {
    return this._global;
  }

  get parent(): ModuleContainer | null {
    return this._parent;
  }

  /**
   * Get a provider instance from the module
   *
   * @param provider The provider token to get the instance from
   * @param shouldThrow True if an error should be thrown if the provider is not found, false otherwise
   * @returns T The provider instance
   */
  get<T>(provider: ProviderToken): T {
    // Search in current module first
    const tokenName = typeof provider === 'function' ? provider.name : String(provider);
    const moduleProvider = this._providers.get(tokenName);

    console.debug(`Getting provider ${tokenName} from module ${this._name}`);
    console.debug(`Available providers: ${Array.from(this._providers.keys()).join(', ')}`);

    if (moduleProvider) return moduleProvider.value as T;

    // Search in imported modules
    for (const container of this._imports) {
      const importedProvider = container.get<T>(tokenName);

      if (importedProvider) return importedProvider;
    }

    throw new Error(`Provider ${tokenName} not found in module ${this._name}`);
  }

  /**
   * Register a provider instance for this module
   *
   * @param tokenName The provider token name
   * @param provider The provider instance
   */
  registerProvider(tokenName: string, provider: Provider): void {
    this._providers.set(tokenName, provider);
  }

  /**
   * Check if the module has a provider exported
   *
   * @param providerToken The provider token to check
   * @returns boolean True if the provider exists and is exported, false otherwise
   */
  hasProviderExported(providerToken: ProviderToken): boolean {
    const name = typeof providerToken === 'function' ? providerToken.name : String(providerToken);
    const provider = this._providers.get(name);

    return provider ? provider.exported : false;
  }
}
