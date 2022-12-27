import { Module } from '@layux/injector';
import { FileMapperService } from './file-mapper.service';

@Module({
  providers: [FileMapperService],
  exports: [FileMapperService],
})
export class FileMapperModule {}
