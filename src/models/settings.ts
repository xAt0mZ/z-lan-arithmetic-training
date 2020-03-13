import Operator from './operator';

class Settings {
  ops = [
    new Operator('Addition', '+'),
    new Operator('Substraction', '-'),
    new Operator('Multiplication', '*'),
    new Operator('Division', '/'),
  ];

  opsCount = 1;

  range = {
    min: 0,
    max: 100,
  };

  allowFloat = false;
}

export default Settings;
