import { Injectable } from '../decorators/injectable.decorator';
import { Module } from '../decorators/module.decorator';
import { ModuleFactory } from '../services/module.service';

// Awesome feature
@Injectable()
class AwesomeService {
  getAwesomeText(): string {
    return 'Awesome!';
  }
}

@Module({
  providers: [AwesomeService],
  exports: [],
})
class AwesomeModule {}

// Poor feature
@Injectable()
class PoorService {
  getPoorText(): string {
    return 'Poor!';
  }
}

@Module({
  providers: [PoorService],
  exports: [PoorService],
})
class PoorModule {}

// Combined feature
@Injectable()
class CombinedService {
  constructor(
    private readonly awesomeService: AwesomeService,
    private readonly poorService: PoorService
  ) {}

  getCombinedText(): string {
    return `${this.awesomeService.getAwesomeText()} ${this.poorService.getPoorText()}`;
  }
}

@Module({
  imports: [PoorModule],
  providers: [CombinedService],
})
class CombinedModule {}

// Main
const runner = async (): Promise<void> => {
  const combinedContainer = await ModuleFactory.create(CombinedModule);
  const combinedService = combinedContainer.get<CombinedService>(CombinedService);

  console.log(combinedService.getCombinedText());
};

runner();
