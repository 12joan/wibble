import { performDiceRollRequest } from './performDiceRollRequest';
import {
  TDiceRollRequestPart,
  TDiceRollResult,
  TDiceRollResultPart,
} from './types';

const fakeRandomDieRoll = async (sides: number) => sides;

const itShouldWorkFor = (
  description: string,
  requestParts: TDiceRollRequestPart[],
  resultParts: TDiceRollResultPart[]
) => {
  it(`should work for ${description}`, async () => {
    const request = {
      label: 'test',
      parts: requestParts,
    } as any;

    const result = await performDiceRollRequest(request, {
      randomDieRoll: fakeRandomDieRoll,
    });

    const expected: TDiceRollResult = {
      ...request,
      parts: resultParts,
    };

    expect(result).toEqual(expected);
  });
};

describe('performDiceRollRequest', () => {
  itShouldWorkFor(
    '1d20',
    [{ type: 'dice', count: 1, die: 20 }],
    [{ type: 'dice', count: 1, die: 20, values: [20] }]
  );

  itShouldWorkFor(
    '2d6',
    [{ type: 'dice', count: 2, die: 6 }],
    [{ type: 'dice', count: 2, die: 6, values: [6, 6] }]
  );

  itShouldWorkFor(
    '1d20 + 5',
    [
      { type: 'dice', count: 1, die: 20 },
      { type: 'modifier', value: 5 },
    ],
    [
      { type: 'dice', count: 1, die: 20, values: [20] },
      { type: 'modifier', value: 5 },
    ]
  );

  itShouldWorkFor(
    '1d20 with advantage',
    [{ type: 'dice', count: 1, die: '20A' }],
    [{ type: 'dice', count: 1, die: '20A', values: [20, 20] }]
  );

  itShouldWorkFor(
    '3d20 with advantage',
    [{ type: 'dice', count: 3, die: '20A' }],
    [{ type: 'dice', count: 3, die: '20A', values: [20, 20, 20, 20, 20, 20] }]
  );

  itShouldWorkFor(
    '4d6 + 1d8 + 2',
    [
      { type: 'dice', count: 4, die: 6 },
      { type: 'dice', count: 1, die: 8 },
      { type: 'modifier', value: 2 },
    ],
    [
      { type: 'dice', count: 4, die: 6, values: [6, 6, 6, 6] },
      { type: 'dice', count: 1, die: 8, values: [8] },
      { type: 'modifier', value: 2 },
    ]
  );
});
