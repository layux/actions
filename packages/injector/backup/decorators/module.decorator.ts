import { MODULE_METADATA_KEY, MODULE_OPTIONS_METADATA_KEY } from '../constants/module.constants';
import { IModuleOptions } from '../interfaces/module-options.interface';

/**
 * Decorator that marks a class as a module.
 *
 * Modules are the basics to bundle dependencies and provide them to other modules and components.
 *
 * @param options Options for the module.
 * @returns A decorator function to inject metadata about the module.
 */
export const Module =
  (options: IModuleOptions): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(MODULE_METADATA_KEY, true, target);
    Reflect.defineMetadata(MODULE_OPTIONS_METADATA_KEY, options, target);
  };
