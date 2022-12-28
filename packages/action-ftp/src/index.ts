export * from './lib/action-ftp';

import { Injectable, Module, ModuleFactory, ProviderScope } from '@layux/injector';
import { IFactoryProvider } from 'packages/injector/src/interfaces/factory-provider.interface';
import 'reflect-metadata';

const Context =
  (name: string): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const parameters = Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
    const type = parameters[parameterIndex];

    console.log({ name, type, target });

    Reflect.defineMetadata('context', name, target, propertyKey);
  };

class Logger {
  constructor() {
    const context = Reflect.getMetadata('context', this, 'log');
    console.log({ context });
  }

  log(msg: string) {
    console.log(msg);
  }
}

const LoggerProvider: IFactoryProvider = {
  useFactory: () => new Logger(),
}

@Module({
  providers: [LoggerProvider],
  exports: [LoggerProvider]
})
class LoggerModule {}

@Injectable()
class Service {
  constructor(@Context('logger') private logger: Logger) {}

  test() {
    this.logger.log('test');
  }
}

@Module({
  imports: [LoggerModule],
  providers: [Service],
})
class Container {}

const bootstrap = async () => {
  const container = await ModuleFactory.create(Container);
  const service = container.get<Service>(Service);

  service.test();
};

bootstrap();
