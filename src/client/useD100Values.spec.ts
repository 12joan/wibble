import { useD100Values } from './useD100Values';

describe('useD100Values', () => {
  it('should return tens and ones', () => {
    const [tens, ones] = useD100Values(42);
    expect(tens).toBe('40');
    expect(ones).toBe('2');
  });

  it('should return 00 for tens if value is 100', () => {
    const [tens] = useD100Values(100);
    expect(tens).toBe('00');
  });

  it('should return 00 for tens if value is less than 10', () => {
    const [tens] = useD100Values(9);
    expect(tens).toBe('00');
  });

  it('should return 0 for ones if value ends in 0', () => {
    const [, ones] = useD100Values(40);
    expect(ones).toBe('0');
  });
});
