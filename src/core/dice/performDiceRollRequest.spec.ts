import { MAX_DICE } from './constants';
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
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it(`should work for ${description}`, async () => {
    const request = {
      label: 'test',
      parts: requestParts,
    } as any;

    const result = await performDiceRollRequest(request, {
      randomDieRoll: fakeRandomDieRoll,
      randomId: () => 'test',
    });

    const expected: TDiceRollResult = {
      ...request,
      id: 'test',
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

  it('should return null if the total number of dice exceeds MAX_DICE', async () => {
    const parts: TDiceRollRequestPart[] = [
      ...Array(Math.floor(MAX_DICE / 2)).fill({
        type: 'dice',
        count: 1,
        die: 20,
      }),
      ...Array(Math.ceil(MAX_DICE / 2)).fill({
        type: 'dice',
        count: 1,
        die: 12,
      }),
      { type: 'dice', count: 1, die: 4 },
    ];

    const request = {
      label: 'test',
      parts,
    } as any;

    const result = await performDiceRollRequest(request, {
      randomDieRoll: fakeRandomDieRoll,
    });

    expect(result).toBeNull();
  });

  it('should not return null if the total number of dice equals MAX_DICE', async () => {
    const parts: TDiceRollRequestPart[] = [
      ...Array(Math.floor(MAX_DICE / 2)).fill({
        type: 'dice',
        count: 1,
        die: 20,
      }),
      ...Array(Math.ceil(MAX_DICE / 2)).fill({
        type: 'dice',
        count: 1,
        die: 12,
      }),
    ];

    const request = {
      label: 'test',
      parts,
    } as any;

    const result = await performDiceRollRequest(request, {
      randomDieRoll: fakeRandomDieRoll,
    });

    expect(result).not.toBeNull();
  });
});
