import { TDiceRollResultPart } from '../types';
import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';

describe('getDiceRollResultPartValue', () => {
  describe('when the part is a modifier', () => {
    it('should return the modifier value', () => {
      const part: TDiceRollResultPart = {
        type: 'modifier',
        value: 5,
      };

      expect(getDiceRollResultPartValue(part)).toBe(5);
    });
  });

  describe('when the part is a dice roll', () => {
    it('should work when 1d20 is rolled', () => {
      const part: TDiceRollResultPart = {
        type: 'dice',
        count: 1,
        die: 20,
        values: [15],
      };

      expect(getDiceRollResultPartValue(part)).toBe(15);
    });

    it('should work when 2d6 is rolled', () => {
      const part: TDiceRollResultPart = {
        type: 'dice',
        count: 2,
        die: 6,
        values: [3, 4],
      };

      expect(getDiceRollResultPartValue(part)).toBe(7);
    });

    it('should work when 1d20 with advantage is rolled', () => {
      const part: TDiceRollResultPart = {
        type: 'dice',
        count: 1,
        die: '20A',
        values: [3, 4],
      };

      expect(getDiceRollResultPartValue(part)).toBe(4);
    });

    it('should work when 1d20 with disadvantage is rolled', () => {
      const part: TDiceRollResultPart = {
        type: 'dice',
        count: 1,
        die: '20D',
        values: [3, 4],
      };

      expect(getDiceRollResultPartValue(part)).toBe(3);
    });

    it('should work when 2d20 with advantage is rolled', () => {
      const part: TDiceRollResultPart = {
        type: 'dice',
        count: 2,
        die: '20A',
        values: [3, 4, 5, 6],
      };

      expect(getDiceRollResultPartValue(part)).toBe(4 + 6);
    });
  });
});
