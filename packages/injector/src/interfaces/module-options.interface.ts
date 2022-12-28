import { ModuleProvider, ProviderToken } from '../types/dependency-injection.types';
import { Constructable } from '../types/reflection.types';

export interface IModuleOptions {
  /**
   * A list of modules that should be imported by this module.
   *
   */
  imports?: Array<Constructable<unknown>>;

  /**
   * A list of components that should be available in this module.
   *
   */
  providers?: Array<ModuleProvider>;

  /**
   * A list of components that should be available in other modules that import this module.
   *
   */
  exports?: Array<ModuleProvider | ProviderToken>;
}
