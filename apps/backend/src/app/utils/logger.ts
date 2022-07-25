export class Logger {
  constructor(private name: string = 'APP') {}
  this() {
    return this;
  }
  info(params) {
    console.info(`\x1b[30m[${this?.name}]\x1b[0m`, params);
  }

  error(params) {
    console.error(`\x1b[31m\x1b[1m[${this?.name}]\x1b[0m`, params);
  }
}

export const logger = new Logger();
