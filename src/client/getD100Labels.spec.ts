import { getD100Labels } from './getD100Labels';

describe('getD100Labels', () => {
  it('should return tens and ones', () => {
    const [tens, ones] = getD100Labels(42);
    expect(tens).toBe('40');
    expect(ones).toBe('2');
  });

  it('should return 00 for tens if value is 100', () => {
    const [tens] = getD100Labels(100);
    expect(tens).toBe('00');
  });

  it('should return 00 for tens if value is less than 10', () => {
    const [tens] = getD100Labels(9);
    expect(tens).toBe('00');
  });

  it('should return 0 for ones if value ends in 0', () => {
    const [, ones] = getD100Labels(40);
    expect(ones).toBe('0');
  });
});
