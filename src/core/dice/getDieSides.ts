import { TDie } from '../types';

export const getDieSides = (die: TDie): number[] => {
  if (['20A', '20D'].includes(die as string)) {
    return [20, 20];
  }

  if (typeof die === 'number') {
    return [die];
  }

  throw new Error(`Unknown die: ${die}`);
};
