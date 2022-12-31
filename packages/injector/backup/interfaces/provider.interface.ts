import { ProviderScope } from '../catalogs/provider-scope.catalog';

export interface IProvider {
  /**
   * The token that identifies the provider.
   *
   */
  name?: symbol | string;

  /**
   * The scope of the provider.
   *
   */
  scope?: ProviderScope;
}
