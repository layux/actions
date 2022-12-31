import { Inject } from '../../decorators/inject.decorator';
import { Injectable } from '../../decorators/injectable.decorator';
import { Context } from '../decorators/context.decorator';
import { Logger } from '../models/logger.model';
import { LoggerToken } from '../providers/logger.provider';

@Injectable()
export class ProvidedService {
  constructor(@Context('logger') @Inject(LoggerToken) private logger: Logger) {}

  test() {
    this.logger.log('test');
  }
}
