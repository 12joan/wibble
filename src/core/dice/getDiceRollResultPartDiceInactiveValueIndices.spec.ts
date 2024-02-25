import { getDiceRollResultPartDiceInactiveValueIndices } from './getDiceRollResultPartDiceInactiveValueIndices';

describe('getDiceRollResultPartDiceInactiveValueIndices', () => {
  it('should return empty array for normal dice', () => {
    expect(
      getDiceRollResultPartDiceInactiveValueIndices({
        type: 'dice',
        count: 4,
        die: 6,
        values: [1, 2, 3, 4],
      })
    ).toEqual([]);
  });

  describe('1d20A', () => {
    it('should return [0] when the second value is the highest', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20A',
          values: [1, 20],
        })
      ).toEqual([0]);
    });

    it('should return [1] when the first value is the highest', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20A',
          values: [20, 1],
        })
      ).toEqual([1]);
    });

    it('should return [1] when both values are the same', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20A',
          values: [20, 20],
        })
      ).toEqual([1]);
    });
  });

  describe('1d20D', () => {
    it('should return [0] when the second value is the lowest', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20D',
          values: [20, 1],
        })
      ).toEqual([0]);
    });

    it('should return [1] when the first value is the lowest', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20D',
          values: [1, 20],
        })
      ).toEqual([1]);
    });

    it('should return [0] when both values are the same', () => {
      expect(
        getDiceRollResultPartDiceInactiveValueIndices({
          type: 'dice',
          count: 1,
          die: '20D',
          values: [20, 20],
        })
      ).toEqual([0]);
    });
  });

  describe('2d20A', () => {
    const testCases = [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 20],
      ],
      [
        [1, 1],
        [20, 1],
      ],
      [
        [1, 1],
        [20, 20],
      ],
      [
        [1, 20],
        [1, 1],
      ],
      [
        [1, 20],
        [1, 20],
      ],
      [
        [1, 20],
        [20, 1],
      ],
      [
        [1, 20],
        [20, 20],
      ],
      [
        [20, 1],
        [1, 1],
      ],
      [
        [20, 1],
        [1, 20],
      ],
      [
        [20, 1],
        [20, 1],
      ],
      [
        [20, 1],
        [20, 20],
      ],
      [
        [20, 20],
        [1, 1],
      ],
      [
        [20, 20],
        [1, 20],
      ],
      [
        [20, 20],
        [20, 1],
      ],
      [
        [20, 20],
        [20, 20],
      ],
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const testCase of testCases) {
      describe(JSON.stringify(testCase), () => {
        const [firstPair, secondPair] = testCase;

        it('should treat each pair independently', () => {
          const firstPairResult = getDiceRollResultPartDiceInactiveValueIndices(
            {
              type: 'dice',
              count: 1,
              die: '20A',
              values: firstPair,
            }
          );

          const secondPairResult =
            getDiceRollResultPartDiceInactiveValueIndices({
              type: 'dice',
              count: 1,
              die: '20A',
              values: secondPair,
            });

          const bothPairsResult = getDiceRollResultPartDiceInactiveValueIndices(
            {
              type: 'dice',
              count: 2,
              die: '20A',
              values: [...firstPair, ...secondPair],
            }
          );

          expect(bothPairsResult).toEqual([
            ...firstPairResult,
            ...secondPairResult.map((index) => index + 2),
          ]);
        });
      });
    }
  });
});
