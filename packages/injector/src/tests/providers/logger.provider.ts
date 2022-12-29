import { IFactoryProvider } from '../../interfaces/factory-provider.interface';
import { Logger } from '../models/logger.model';

export const LoggerToken = Symbol('LoggerProvider');

export const LoggerProvider: IFactoryProvider = {
  name: LoggerToken,
  useFactory: () => new Logger(),
};
