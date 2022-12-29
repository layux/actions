import { Module } from '../../decorators/module.decorator';
import { AwesomeService } from '../services/awesome.service';

@Module({
  providers: [AwesomeService],
  exports: [AwesomeService],
})
export class AwesomeModule {}
