import 'reflect-metadata';
import {
  PROVIDER_METADATA_KEY,
  PROVIDER_SCOPE_METADATA_KEY,
} from '../constants/provider.constants';
import { ProviderScope } from '../catalogs/provider-scope.catalog';

/**
 * Decorator that marks a class as a provider.
 * 
 * A provider is a value that can be injected into other providers.
 * 
 * @param scope The scope of the provider. Defaults to singleton.
 * @returns A decorator function to inject metadata about the provider.
 */
export const Injectable =
  (scope: ProviderScope = ProviderScope.Singleton): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(PROVIDER_METADATA_KEY, true, target);
    Reflect.defineMetadata(PROVIDER_SCOPE_METADATA_KEY, scope, target);
  };
