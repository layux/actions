import { ModuleFactory } from '../services/module.service';
import { ProvidedService } from './services/provided.service';
import { ProvidedContainerModule } from './modules/provided-container.module';
import { ModuleContainer } from '../models/module-container.model';
import { LoggerToken } from './providers/logger.provider';

describe('ProvidedContainerModule', () => {
  let container: ModuleContainer;

  beforeAll(async () => {
    console.debug('Creating container for ProvidedContainerModule');
    container = await ModuleFactory.create(ProvidedContainerModule);
    console.debug('Container created');
  });

  it('should create container for CombinedModule', async () => {
    expect(container).toBeDefined();
  });

  it('should get ProvidedService from container', async () => {
    const combinedService = container.get<ProvidedService>(ProvidedService);
    expect(combinedService).toBeDefined();
  });

  it('should get Logger from container', async () => {
    const logger = container.get(LoggerToken);
    expect(logger).toBeDefined();
  });

  it('should call test() method from ProvidedService', async () => {
    const combinedService = container.get<ProvidedService>(ProvidedService);
    expect(combinedService.test()).toBe('test');
  });
});
