import { Constructable } from './reflection.types';
import { IClassProvider } from '../interfaces/class-provider.interface';
import { IFactoryProvider } from '../interfaces/factory-provider.interface';
import { IValueProvider } from '../interfaces/value-provider.interface';

export type ModuleProvider =
  | Constructable<unknown>
  | IValueProvider
  | IClassProvider
  | IFactoryProvider;

export type ProviderToken = Constructable<unknown> | Symbol | string;
