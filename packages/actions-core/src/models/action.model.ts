import { ModuleContainer, ProviderToken } from '@layux/injector';

export class Action {
  constructor(
    private readonly _module: unknown,
    private readonly _container: ModuleContainer,
    // private readonly _logger: Logger
  ) {}

  async execute(): Promise<void> {
    // Resolve action entrypoint from module
  }

  get<T>(type: ProviderToken): T {
    return this._container.get(type);
  }
}
