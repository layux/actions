import { ProviderScope } from '../catalogs/provider-scope.catalog';

export class Provider {
  constructor(
    private readonly _name: string,
    private readonly _value: unknown,
    private readonly _scope: ProviderScope,
    private _exported: boolean = false
  ) {}
  /**
   * Get the provider name
   *
   */
  get name(): string {
    return this._name;
  }

  /**
   * Get the provider value
   *
   * @returns unknown The provider value
   */
  get value(): unknown {
    return this._value;
  }

  /**
   * Get the provider scope
   *
   * @returns ProviderScope The provider scope
   */
  get scope(): ProviderScope {
    return this._scope;
  }

  /**
   * Get the provider exported status
   *
   * @returns boolean True if the provider is exported, false otherwise
   */
  get exported(): boolean {
    return this._exported;
  }

  /**
   * Set the provider exported status
   *
   * @param value The new exported status
   */
  set exported(value: boolean) {
    this._exported = value;
  }
}
