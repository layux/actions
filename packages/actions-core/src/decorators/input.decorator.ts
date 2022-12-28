import 'reflect-metadata';
import * as core from '@actions/core';
import * as yaml from 'yaml';
import { SEPARATOR_METADATA_KEY } from '../constants/metadata.constants';

export const Input =
  (name: string, required = false): PropertyDecorator =>
  (target, propertyKey) => {
    // Read the property type and cast the value to that type
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    const value = core.getInput(name, { required });

    if (!value) return;

    switch (type) {
      case Array: {
        const separator = Reflect.getMetadata(SEPARATOR_METADATA_KEY, target, propertyKey);

        if (separator) {
          Reflect.set(target, propertyKey, value.split(separator));
        } else {
          Reflect.set(target, propertyKey, yaml.parse(value));
        }

        break;
      }

      case Object:
        Reflect.set(target, propertyKey, yaml.parse(value));
        break;

      case Boolean:
        Reflect.set(target, propertyKey, value.toLowerCase() === 'true');
        break;

      case Number:
        Reflect.set(target, propertyKey, Number(value));
        break;

      default:
        Reflect.set(target, propertyKey, value);
        break;
    }
  };
