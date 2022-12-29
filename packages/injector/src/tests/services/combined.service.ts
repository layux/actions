import { Injectable } from '../../decorators/injectable.decorator';
import { AwesomeService } from './awesome.service';
import { PoorService } from './poor.service';

@Injectable()
export class CombinedService {
  constructor(
    private readonly awesomeService: AwesomeService,
    private readonly poorService: PoorService
  ) {}

  getCombinedText(): string {
    return `${this.awesomeService.getAwesomeText()} ${this.poorService.getPoorText()}`;
  }
}
