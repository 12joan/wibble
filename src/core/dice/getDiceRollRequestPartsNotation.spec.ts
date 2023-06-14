import { getDiceRollRequestPartsNotation } from './getDiceRollRequestPartsNotation';
import { parseDiceNotation } from './parseDiceNotation';

const itShouldWorkFor = (notation: string) => {
  it(`should work for ${notation}`, () => {
    const parts = parseDiceNotation(notation);
    const result = getDiceRollRequestPartsNotation(parts!);
    expect(result).toEqual(notation);
  });
};

describe('getDiceRollRequestNotation', () => {
  itShouldWorkFor('1d6');
  itShouldWorkFor('1d6 + 1');
  itShouldWorkFor('1d6 + 1d4');
  itShouldWorkFor('1d6 + 1d4 + 1');
  itShouldWorkFor('2d6');
  itShouldWorkFor('200d999');
  itShouldWorkFor('1');
  itShouldWorkFor('1 + 1');
  itShouldWorkFor('1 - 1 + 1 - 1');
  itShouldWorkFor('- 1');
  itShouldWorkFor('1d4 + 1 + 1d4 - 1');
  itShouldWorkFor('1d20A');
  itShouldWorkFor('1d20D');
});
