import { Constructable } from '../types/reflection.types';
import { IProvider } from './provider.interface';

export interface IClassProvider extends IProvider {
  /**
   * The class that will be injected.
   *
   */
  useClass: Constructable<unknown>;
}
