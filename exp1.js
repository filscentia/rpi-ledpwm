const Gpio = require('pigpio').Gpio;

const off = () => {
  led['G'].pwm.targetDutyCycle = 0;
  led['R'].pwm.targetDutyCycle = 0;
  led['B'].pwm.targetDutyCycle = 0;
}


const white = () => {
  led['G'].pwm.targetDutyCycle = 255;
  led['R'].pwm.targetDutyCycle = 255;
  led['B'].pwm.targetDutyCycle = 255;
}

const red = () => {
  led['G'].pwm.targetDutyCycle = 0;
  led['R'].pwm.targetDutyCycle = 255;
  led['B'].pwm.targetDutyCycle = 0;
}

const green = () => {
  led['G'].pwm.targetDutyCycle = 255;
  led['R'].pwm.targetDutyCycle = 0;
  led['B'].pwm.targetDutyCycle = 0;
}

const blue = () => {
  led['G'].pwm.targetDutyCycle = 0;
  led['R'].pwm.targetDutyCycle = 0;
  led['B'].pwm.targetDutyCycle = 255;
}

const purple = () => {
  led['G'].pwm.targetDutyCycle = 0;
  led['R'].pwm.targetDutyCycle = 255;
  led['B'].pwm.targetDutyCycle = 255;
}

const orange = () => {
  led['G'].pwm.targetDutyCycle = 50;
  led['R'].pwm.targetDutyCycle = 255;
  led['B'].pwm.targetDutyCycle = 0;
}

const yellow = () => {
  led['G'].pwm.targetDutyCycle = 255;
  led['R'].pwm.targetDutyCycle = 255;
  led['B'].pwm.targetDutyCycle = 0;
}

const op = () => {
  console.log(` R: ${led['R'].pwm.dutyCycle} [${led['R'].pwm.targetDutyCycle}]  G: ${led['G'].pwm.dutyCycle} [${led['G'].pwm.targetDutyCycle}]  B: ${led['B'].pwm.dutyCycle} [${led['B'].pwm.targetDutyCycle}]`)
}

const colour_gpio = { 'G':4, 'B':2, 'R': 3};

const led = {
  'G': {
    gpio: new Gpio(colour_gpio['G'], { mode: Gpio.OUTPUT }),
    pwm: {
      dutyCycle: 0,
      targetDutyCycle: 255
    }
  },
  'B': {
    gpio: new Gpio(colour_gpio['B'], { mode: Gpio.OUTPUT }),
    pwm: {
      dutyCycle: 0,
      targetDutyCycle: 255
    }
  },
  'R': {
    gpio: new Gpio(colour_gpio['R'], { mode: Gpio.OUTPUT }),
    pwm: {
      dutyCycle: 0,
      targetDutyCycle: 255
    }
  },
}

const slide = () => {
  for (const key in led) {
    if (led.hasOwnProperty(key)) {
      const l = led[key];

      let target = l.pwm.targetDutyCycle;
      if (l.pwm.dutyCycle === target) {
        // nothing to do.
      } else if (l.pwm.dutyCycle > target) {
        l.pwm.dutyCycle -= 5;
      } else if (l.pwm.dutyCycle < target) {
        l.pwm.dutyCycle += 5;
      }
    }
  }
}

setInterval(() => {
  slide();
  updateLED();
}, 5);


const updateLED = () => {
  for (const key in led) {
    if (led.hasOwnProperty(key)) {
      const l = led[key];
      l.gpio.pwmWrite(l.pwm.dutyCycle);
    }
  }
}

let sequence = [white, red, green, blue, off];
//, purple, yellow, yellow, orange, green];
let si = 0;

setInterval(() => {
  sequence[si]();
  si++;
  if (si === sequence.length) {
    si = 0;
  }
}, 5000);