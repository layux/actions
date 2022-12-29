import { Module } from '../../decorators/module.decorator';
import { ProvidedService } from '../services/provided.service';
import { LoggerModule } from './logger.module';

@Module({
  imports: [LoggerModule],
  providers: [ProvidedService],
})
export class ProvidedContainerModule {}
