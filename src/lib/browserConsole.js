const Transport = require('winston-transport');

export default class BrowserConsole extends Transport {
  constructor(opts) {
    super(opts);

    this.name = 'BrowserConsole';
    this.levels = {
        error: 0,
        warn: 1,
        info: 2,
        debug: 4,
    };

    this.methods = {
        error: 'error',
        warn: 'warn',
        info: 'info',
        debug: 'log',
    };

    this.level = opts.level && this.levels.hasOwnProperty(opts.level)
                  ? opts.level : 'info';
  }

  log(method, message) {
    setImmediate(() => {
      this.emit('logged', method);
    });

    const val = this.levels[method];
    const mappedMethod = this.methods[method];

    if (val <= this.levels[this.level]) {
      // eslint-disable-next-line
      console[mappedMethod](message);
    }
  }
}