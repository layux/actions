import { ModuleFactory } from '../index';
import { SimpleContainerModule } from './modules/simple-container.module';
import { CombinedService } from './services/combined.service';

describe('SimpleContainerModule', () => {
  it('should create container for CombinedModule', async () => {
    const combinedContainer = await ModuleFactory.create(SimpleContainerModule);
    expect(combinedContainer).toBeDefined();

    const combinedService = combinedContainer.get<CombinedService>(CombinedService);

    expect(combinedService).toBeDefined();
    expect(combinedService.getCombinedText()).toBe('Awesome! Poor!');
  });
});
