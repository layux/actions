import 'reflect-metadata';

export const Context =
  (name: string): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const parameters = Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
    const type = parameters[parameterIndex];

    console.log({ name, type, target });

    Reflect.defineMetadata('context', name, target, propertyKey);
  };
