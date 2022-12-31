import 'reflect-metadata';
import { InjectionScope } from '../catalog/injection-scope.catalog';
import {
  PROVIDER_SCOPE_METADATA_KEY,
  PROVIDER_INJECTABLLE_METADATA_KEY,
} from '../constant/metadata.constant';

/**
 * Decorator for marking a class as injectable. Without this decorator
 * the class will not be registered in the injector and will throw an
 * error when trying to inject it.
 *
 * Example:
 * `typescript
 * @Injectable()
 * class MyService {
 * // ...
 *
 * `
 *
 * @param scope The scope of the injectable.
 * @returns The class decorator.
 */
export const Injectable =
  (scope: InjectionScope = InjectionScope.Singleton): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(PROVIDER_INJECTABLLE_METADATA_KEY, true, target);
    Reflect.defineMetadata(PROVIDER_SCOPE_METADATA_KEY, scope, target);
  };
