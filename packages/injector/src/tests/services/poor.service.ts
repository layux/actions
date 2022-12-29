import { Injectable } from '../../decorators/injectable.decorator';

@Injectable()
export class PoorService {
  getPoorText(): string {
    return 'Poor!';
  }
}
