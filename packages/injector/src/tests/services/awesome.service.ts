import { Injectable } from "../../decorators/injectable.decorator";

@Injectable()
export class AwesomeService {
  getAwesomeText(): string {
    return 'Awesome!';
  }
}
