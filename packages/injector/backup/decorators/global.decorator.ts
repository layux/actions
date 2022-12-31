import { MODULE_GLOBAL_METADATA_KEY } from '../constants/module.constants';

/**
 * Decorator that marks a module as a global module.
 *
 * A global module is a module that will be available to all other modules without adding it to the imports array.
 *
 * @returns A decorator function to inject metadata about the module.
 */
export const Global = (): ClassDecorator => (target) => {
  Reflect.defineMetadata(MODULE_GLOBAL_METADATA_KEY, true, target);
};
