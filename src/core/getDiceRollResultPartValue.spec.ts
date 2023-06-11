import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';
import { DiceRollRequestPart } from './types';

describe('getDiceRollRequestPartValue', () => {
  describe('when the part is a modifier', () => {
    it('should return the modifier value', () => {
      const part: DiceRollRequestPart = {
        type: 'modifier',
        value: 5,
      };

      expect(getDiceRollResultPartValue(part, [])).toBe(5);
    });
  });

  describe('when the part is a dice roll', () => {
    it('should work when 1d20 is rolled', () => {
      const part: DiceRollRequestPart = {
        type: 'dice',
        count: 1,
        die: 20,
      };

      const partDieValues = [15];

      expect(getDiceRollResultPartValue(part, partDieValues)).toBe(15);
    });

    it('should work when 2d6 is rolled', () => {
      const part: DiceRollRequestPart = {
        type: 'dice',
        count: 2,
        die: 6,
      };

      const partDieValues = [3, 4];

      expect(getDiceRollResultPartValue(part, partDieValues)).toBe(7);
    });

    it('should work when 1d20 with advantage is rolled', () => {
      const part: DiceRollRequestPart = {
        type: 'dice',
        count: 1,
        die: '20A',
      };

      const partDieValues = [3, 4];

      expect(getDiceRollResultPartValue(part, partDieValues)).toBe(4);
    });

    it('should work when 1d20 with disadvantage is rolled', () => {
      const part: DiceRollRequestPart = {
        type: 'dice',
        count: 1,
        die: '20D',
      };

      const partDieValues = [3, 4];

      expect(getDiceRollResultPartValue(part, partDieValues)).toBe(3);
    });

    it('should work when 2d20 with advantage is rolled', () => {
      const part: DiceRollRequestPart = {
        type: 'dice',
        count: 2,
        die: '20A',
      };

      const partDieValues = [3, 4, 5, 6];

      expect(getDiceRollResultPartValue(part, partDieValues)).toBe(4 + 6);
    });
  });
});
