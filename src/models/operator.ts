class Operator {
  label: string;

  sign: string;

  activated: boolean;

  constructor(label: string, sign: string) {
    this.label = label;
    this.sign = sign;
    this.activated = true;
  }
}

export default Operator;
