export enum ProviderScope {
  /**
   * The provider will be instantiated only once and the same instance will be injected in all the places where the provider is used.
   *
   */
  Singleton,

  /**
   * The provider will be instantiated every time it is injected.
   *
   */
  Transient,
}
