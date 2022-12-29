import { Module } from '../../decorators/module.decorator';
import { LoggerProvider } from '../providers/logger.provider';

@Module({
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule {}
