import { InjectionScope } from '../../catalog/injection-scope.catalog';
import {
  PROVIDER_INJECTABLLE_METADATA_KEY,
  PROVIDER_SCOPE_METADATA_KEY,
} from '../../constant/metadata.constant';
import { Injectable } from '../../decorator/injectable.decorator';

describe('@Injectable decorator', () => {
  @Injectable(InjectionScope.Transient)
  class MyService {}

  it('should mark a class as injectable', () => {
    const isInjectable = Reflect.getMetadata(PROVIDER_INJECTABLLE_METADATA_KEY, MyService);
    expect(isInjectable).toBe(true);
  });

  it('should set the scope of the injectable to Transient', () => {
    const scope = Reflect.getMetadata(PROVIDER_SCOPE_METADATA_KEY, MyService);
    expect(scope).toBe(InjectionScope.Transient);
  });
});
