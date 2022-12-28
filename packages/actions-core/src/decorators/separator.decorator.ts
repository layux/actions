import { SEPARATOR_METADATA_KEY } from "../constants/metadata.constants";

export const Separator =
  (separator: string): PropertyDecorator =>
  (target, propertyKey) => {
    Reflect.defineMetadata(SEPARATOR_METADATA_KEY, separator, target, propertyKey);
  };
