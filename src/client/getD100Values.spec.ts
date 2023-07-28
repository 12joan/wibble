import { getD100Values } from './getD100Values';

describe('getD100Values', () => {
  it('should return tens and ones', () => {
    const [tens, ones] = getD100Values(42);
    expect(tens).toBe('40');
    expect(ones).toBe('2');
  });

  it('should return 00 for tens if value is 100', () => {
    const [tens] = getD100Values(100);
    expect(tens).toBe('00');
  });

  it('should return 00 for tens if value is less than 10', () => {
    const [tens] = getD100Values(9);
    expect(tens).toBe('00');
  });

  it('should return 0 for ones if value ends in 0', () => {
    const [, ones] = getD100Values(40);
    expect(ones).toBe('0');
  });
});
