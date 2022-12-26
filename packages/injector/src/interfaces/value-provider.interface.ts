import { IProvider } from './provider.interface';

export interface IValueProvider extends IProvider {
  /**
   * The value that will be injected.
   *
   */
  useValue: unknown;
}
