/* eslint-disable no-cond-assign */
import { TDiceRollRequestPart } from '../types';

export const parseDiceNotation = (
  notation: string
): TDiceRollRequestPart[] | null => {
  const lexemes = notation
    .replace(/\s+/g, '')
    .split(/([+-])/)
    .filter((lexeme) => lexeme !== '');

  let sign: 1 | -1 = 1;
  const parts: TDiceRollRequestPart[] = [];
  let diceMatch: RegExpMatchArray | null;
  let modifierMatch: RegExpMatchArray | null;
  let error = false;

  lexemes.forEach((lexeme) => {
    if (lexeme === '+') {
      // Do nothing
    } else if (lexeme === '-') {
      sign *= -1;
    } else if ((diceMatch = lexeme.match(/^(\d*)d(\d+|20[adAD])$/))) {
      const [, countString, dieString] = diceMatch;
      const count = countString ? parseInt(countString, 10) : 1;

      const die = /[^0-9]/.test(dieString)
        ? (dieString.toUpperCase() as '20A' | '20D')
        : parseInt(dieString, 10);

      if (die === 0) {
        error = true;
      } else {
        parts.push({ type: 'dice', count, die });
      }
    } else if ((modifierMatch = lexeme.match(/^(\d+)$/))) {
      const [, valueString] = modifierMatch;
      const value = sign * parseInt(valueString, 10);
      parts.push({ type: 'modifier', value });
      sign = 1;
    } else {
      error = true;
    }
  });

  return error ? null : parts;
};
