/**
 * Maintainer: xAt0mZ
 */
class Op {
  constructor(label, sign) {
    this.label = label;
    this.sign = sign;
    this.activated = true;
  }
}
const app = new Vue({
  el: '#app',
  data: {
    settings: {
      ops: [
        new Op('Addition', '+'),
        new Op('Substraction', '-'),
        new Op('Multiplication', '*'),
        new Op('Division', '/')
      ],
      opsCount: 1,
      range: {
        min: 0,
        max: 100
      },
      allowFloat: false
    },
    time: {
      timer: null,
      start: 0,
      now: 0
    },
    expression: '',
    result: 0,
    status: ''
  },
  computed: {
    elapsedTime() {
      return this.time.now - this.time.start;
    }
  },
  methods: {
    stopTimer() {
      if (this.time.timer) {
        window.clearInterval(this.time.timer);
        this.time.timer = null;
      }
    },
    startTimer() {
      this.stopTimer();
      this.time.start = Date.now();
      this.time.now = this.time.start;
      this.time.timer = window.setInterval((() => this.time.now = Date.now()), 1);
    },
    randomNumber() {
      const min = this.settings.range.min;
      const max = this.settings.range.max + 1;
      if (this.settings.allowFloat) {
        return math.random(min, max);
      }
      return math.randomInt(min, max);
    },
    generateExpression() {
      let expression = this.randomNumber();
      const ops = _.filter(this.settings.ops, {activated: true});
      for (let i = 0; i < this.settings.opsCount; i++) {
        const op = math.pickRandom(ops);
        const end = this.randomNumber();
        expression += op.sign + end;
      }
      this.expression = expression;
      this.startTimer();
    },
    onSubmit() {
      this.stopTimer();
      const res = math.evaluate(this.expression);
      if (res === this.result) {
        this.status = 'GG !'
      } else {
        this.status = 'Expected result was: ' + res;
      }
    }
  },
});