import { Injectable, Module, ModuleFactory } from '../index';

describe('injector', () => {
  @Injectable()
  class AwesomeService {
    getAwesomeText(): string {
      return 'Awesome!';
    }
  }

  @Module({
    providers: [AwesomeService],
    exports: [AwesomeService],
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
      console.log(this.awesomeService, this.poorService);

      return `${this.awesomeService.getAwesomeText()} ${this.poorService.getPoorText()}`;
    }
  }

  @Module({
    imports: [AwesomeModule, PoorModule],
    providers: [CombinedService],
  })
  class CombinedModule {}

  it('should create container for CombinedModule', async () => {
    const combinedContainer = await ModuleFactory.create(CombinedModule);
    expect(combinedContainer).toBeDefined();

    const combinedService = combinedContainer.get<CombinedService>(CombinedService);
    expect(combinedService).toBeDefined();
  });
});
