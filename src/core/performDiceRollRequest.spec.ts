import { performDiceRollRequest } from './performDiceRollRequest';
import { DiceRollRequestPart } from './types';

const fakeRandomDieRoll = async (sides: number) => sides;

const itShouldWorkFor = (
  description: string,
  parts: DiceRollRequestPart[],
  partsDieSides: number[][]
) => {
  it(`should work for ${description}`, async () => {
    const request = { parts } as any;

    const result = await performDiceRollRequest(request, {
      randomDieRoll: fakeRandomDieRoll,
    });

    expect(result).toEqual({
      request,
      partsDieValues: partsDieSides,
    });
  });
};

describe('performDiceRollRequest', () => {
  itShouldWorkFor('1d20', [{ type: 'dice', count: 1, die: 20 }], [[20]]);

  itShouldWorkFor('2d6', [{ type: 'dice', count: 2, die: 6 }], [[6, 6]]);

  itShouldWorkFor(
    '1d20 + 5',
    [
      { type: 'dice', count: 1, die: 20 },
      { type: 'modifier', value: 5 },
    ],
    [[20], []]
  );

  itShouldWorkFor(
    '1d20 with advantage',
    [{ type: 'dice', count: 1, die: '20A' }],
    [[20, 20]]
  );

  itShouldWorkFor(
    '3d20 with advantage',
    [{ type: 'dice', count: 3, die: '20A' }],
    [[20, 20, 20, 20, 20, 20]]
  );

  itShouldWorkFor(
    '4d6 + 1d8 + 2',
    [
      { type: 'dice', count: 4, die: 6 },
      { type: 'dice', count: 1, die: 8 },
      { type: 'modifier', value: 2 },
    ],
    [[6, 6, 6, 6], [8], []]
  );
});
