export interface IGetProviderOptions {
  /**
   * If true, the provider will only be searched in the current module.
   * 
   */
  strict?: boolean;

  /**
   * If true all provider instances will be returned.
   *
   */
  each?: boolean;
}
