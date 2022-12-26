import { PROVIDER_INJECT_METADATA_KEY } from '../constants/provider.constants';

/**
 * Decorator that marks a parameter as injectable with the given token.
 *
 * @param token The token to inject.
 * @returns A decorator function to inject metadata about the parameter.
 */
export const Inject =
  (token: string): ParameterDecorator =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (target, _propertyKey, _parameterIndex) => {
    Reflect.defineMetadata(PROVIDER_INJECT_METADATA_KEY, token, target);
  };
