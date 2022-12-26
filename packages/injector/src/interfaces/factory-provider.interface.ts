import { IProvider } from './provider.interface';

export interface IFactoryProvider extends IProvider {
  /**
   * The factory that will be invoked to create the value that will be injected.
   *
   */
  useFactory: (...args: Array<unknown>) => Promise<unknown>;
}
