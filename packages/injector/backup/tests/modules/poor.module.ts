import { Module } from '../../decorators/module.decorator';
import { PoorService } from '../services/poor.service';

@Module({
  providers: [PoorService],
  exports: [PoorService],
})
export class PoorModule {}
