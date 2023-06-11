import { randomInt } from 'crypto';

export const randomDieRoll = (sides: number) => new Promise<number>((resolve, reject) => {
  randomInt(1, sides + 1, (err, n) => {
    if (err) {
      reject(err);
    } else {
      resolve(n);
    }
  });
});
