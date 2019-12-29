const Gpio = require('pigpio').Gpio;
const ledB = new Gpio(4, {mode: Gpio.OUTPUT});
const ledR = new Gpio(3, {mode: Gpio.OUTPUT});
const ledG = new Gpio(2, {mode: Gpio.OUTPUT});

ledB.digitalWrite(0);
ledR.digitalWrite(0);
ledG.digitalWrite(0);

let on = true;

setInterval(() => {
    ledB.digitalWrite(on?1:0);
    ledR.digitalWrite(on?1:0);
    ledG.digitalWrite(on?1:0);
    on = !on;
  }, 1000);