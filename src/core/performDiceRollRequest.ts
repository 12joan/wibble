import { DiceRollRequest, DiceRollResult } from './types';

export interface PerformDiceRollRequestOptions {
  randomDieRoll: (sides: number) => Promise<number>;
}

export const performDiceRollRequest = async (
  request: DiceRollRequest,
  { randomDieRoll }: PerformDiceRollRequestOptions
): Promise<DiceRollResult> => {
  const partsDieSides: number[][] = request.parts.map((part) => {
    if (part.type !== 'dice') return [];

    return Array.from({ length: part.count }, () => {
      if (['20A', '20D'].includes(part.die as string)) {
        return [20, 20];
      }

      if (typeof part.die === 'number') {
        return [part.die];
      }

      throw new Error(`Unknown die: ${part.die}`);
    }).flat(1);
  });

  const partsDieValues: number[][] = await Promise.all(
    partsDieSides.map((part) =>
      Promise.all(part.map((die) => randomDieRoll(die)))
    )
  );

  return {
    request,
    partsDieValues,
  };
};
