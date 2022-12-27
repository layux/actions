import * as core from '@actions/core';

export const Input =
  (name: string, required = false): PropertyDecorator =>
  (target, propertyKey) => {
    // Read the property type and cast the value to that type
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    // For arrays check if there's a @Separator decorator and use that metadata to split the string, otherwise try to use yaml.parse
    if (type === Array) {
      const separator = Reflect.getMetadata('separator', target, propertyKey);

      if (separator) {
        Reflect.set(target, propertyKey, core.getInput(name).split(separator));
      } else {
        Reflect.set(target, propertyKey, core.getMultilineInput(name, { required }));
      }
    }
  };
