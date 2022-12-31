export class Logger {
  constructor() {
    const context = Reflect.getMetadata('context', this, 'log');
    console.log({ context });
  }

  log(msg: string) {
    console.log(msg);
  }
}
