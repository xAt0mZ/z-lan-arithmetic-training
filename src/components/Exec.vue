<template>
  <div class="container" :class="{valid: resultStatus, invalid: !resultStatus}">
    <h1>Training</h1>
    <button v-on:click="generateExpression">Generate new expression</button>
    <div>
      <h3>Elapsed time: {{elapsedTime / 1000}}</h3>
    </div>
    <div>
      <h3>Resolve: {{expression}}</h3>
      <form @submit.prevent="onSubmit">
        <input v-model.number="result.submitted" type="number" />
        <input type="submit" value="Submit" />
      </form>
      <h1 v-if="resultStatus">GG!</h1>
      <h1 v-else-if="resultStatus !== undefined && resultStatus === false">
        Expected result: {{result.expected}}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import * as math from 'mathjs';
import _ from 'lodash-es';

import Settings from '@/models/settings';

@Component
export default class ExecComponent extends Vue {
  @Model('', { required: true }) readonly settings!: Settings;

  time = {
    timer: 0,
    start: 0,
    now: 0,
  };

  expression = '';

  result = {
    submitted: 0,
    expected: null,
  };


  created() {
    this.resetResult();
  }

  get elapsedTime() {
    return this.time.now - this.time.start;
  }

  get resultStatus() {
    return this.result.expected && this.result.expected === this.result.submitted;
  }

  stopTimer(): void {
    if (this.time.timer) {
      window.clearInterval(this.time.timer);
      this.time.timer = 0;
    }
  }

  private setTimer() {
    this.time.now = Date.now();
  }

  startTimer() {
    this.stopTimer();
    this.time.start = Date.now();
    this.time.now = this.time.start;
    this.time.timer = window.setInterval(this.setTimer, 1);
  }

  resetResult() {
    this.result = {
      submitted: 0,
      expected: null,
    };
  }

  randomNumber() {
    const { min } = this.settings.range;
    const max = this.settings.range.max + 1;
    if (this.settings.allowFloat) {
      return math.random(min, max);
    }
    return math.randomInt(min, max);
  }

  generateExpression() {
    this.resetResult();
    let expression = this.randomNumber().toString();
    const ops = _.filter(this.settings.ops, { activated: true });
    for (let i = 0; i < this.settings.opsCount; i += 1) {
      const op = ops[math.randomInt(0, ops.length)];
      const end = this.randomNumber();
      expression += op.sign + end.toString();
    }
    this.expression = expression;
    this.startTimer();
  }

  onSubmit() {
    this.stopTimer();
    this.result.expected = math.evaluate(this.expression);
  }
}
</script>

<style scoped>
.valid {
  background-color:lightgreen;
}
.invalid {
  background-color:lightsalmon;
}
</style>
