/* eslint-disable no-console,class-methods-use-this */

import ILogger from './ILogger';

export default class Logger extends ILogger {
  logger(message: string, info: string) {
    console.log(`${message} ${info}`);
  }
}
