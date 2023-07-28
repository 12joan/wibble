import { getD10Label } from './getD10Label';

describe('getD10Label', () => {
  it('should return values 1-9', () => {
    const label = getD10Label(4);
    expect(label).toBe('4');
  });

  it('should return 0 if value is 10', () => {
    const label = getD10Label(10);
    expect(label).toBe('0');
  });
});
