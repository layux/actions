import { Module } from '../../decorators/module.decorator';
import { CombinedService } from '../services/combined.service';
import { AwesomeModule } from './awesome.module';
import { PoorModule } from './poor.module';

@Module({
  imports: [AwesomeModule, PoorModule],
  providers: [CombinedService],
})
export class SimpleContainerModule {}
