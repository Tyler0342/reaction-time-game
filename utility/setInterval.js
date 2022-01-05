class SetInterval {
  constructor(func, interval) {
    this.func = func;

    this.step = this.step.bind(this);

    this.interval = interval;
    this.expected = 0;
    this.timeout = () => {};
  }

  start() {
    this.expected = Date.now() + this.interval;
    this.timeout = setTimeout(this.step, this.interval);
  }

  step() {
    let drift = Date.now() - this.expected;

    this.func();

    this.expected += this.interval;
    this.timeout = setTimeout(this.step, Math.max(0, this.interval - drift));
  }

  stop() {
    clearTimeout(this.timeout);
  }
}

export default SetInterval;