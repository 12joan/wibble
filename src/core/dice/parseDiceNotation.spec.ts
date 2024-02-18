import { parseDiceNotation } from './parseDiceNotation';

describe('parseDiceNotation', () => {
  it('should parse d6', () => {
    expect(parseDiceNotation('d6')).toEqual([
      { type: 'dice', die: 6, count: 1 },
    ]);
  });

  it('should parse 1d6', () => {
    expect(parseDiceNotation('1d6')).toEqual([
      { type: 'dice', die: 6, count: 1 },
    ]);
  });

  it('should parse 2d6', () => {
    expect(parseDiceNotation('2d6')).toEqual([
      { type: 'dice', die: 6, count: 2 },
    ]);
  });

  it('should parse 1d6+1 (without spaces)', () => {
    expect(parseDiceNotation('1d6+1')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'modifier', value: 1 },
    ]);
  });

  it('should parse 1d6 + 1 (with spaces)', () => {
    expect(parseDiceNotation('1d6 + 1')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'modifier', value: 1 },
    ]);
  });

  it('should parse 1d6-1 (without spaces)', () => {
    expect(parseDiceNotation('1d6-1')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'modifier', value: -1 },
    ]);
  });

  it('should parse 1d6 - 1 (with spaces)', () => {
    expect(parseDiceNotation('1d6 - 1')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'modifier', value: -1 },
    ]);
  });

  it('should parse 1d6+-1', () => {
    expect(parseDiceNotation('1d6+-1')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'modifier', value: -1 },
    ]);
  });

  it('should parse 1', () => {
    expect(parseDiceNotation('1')).toEqual([{ type: 'modifier', value: 1 }]);
  });

  it('should parse -1', () => {
    expect(parseDiceNotation('-1')).toEqual([{ type: 'modifier', value: -1 }]);
  });

  it('should parse 1d6+1d4', () => {
    expect(parseDiceNotation('1d6+1d4')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'dice', die: 4, count: 1 },
    ]);
  });

  it('should parse 1d6+ 1d4+10', () => {
    expect(parseDiceNotation('1d6+ 1d4+10')).toEqual([
      { type: 'dice', die: 6, count: 1 },
      { type: 'dice', die: 4, count: 1 },
      { type: 'modifier', value: 10 },
    ]);
  });

  it('should parse 1d20A', () => {
    expect(parseDiceNotation('1d20A')).toEqual([
      { type: 'dice', die: '20A', count: 1 },
    ]);
  });

  it('should parse 1d20D', () => {
    expect(parseDiceNotation('1d20D')).toEqual([
      { type: 'dice', die: '20D', count: 1 },
    ]);
  });

  it('should parse 1d20a', () => {
    expect(parseDiceNotation('1d20a')).toEqual([
      { type: 'dice', die: '20A', count: 1 },
    ]);
  });

  it('should parse 1d20d', () => {
    expect(parseDiceNotation('1d20d')).toEqual([
      { type: 'dice', die: '20D', count: 1 },
    ]);
  });

  it('should parse 1D20', () => {
    expect(parseDiceNotation('1D20')).toEqual([
      { type: 'dice', die: 20, count: 1 },
    ]);
  });

  it('should parse 1D20d', () => {
    expect(parseDiceNotation('1D20d')).toEqual([
      { type: 'dice', die: '20D', count: 1 },
    ]);
  });

  it('should return null for invalid notation', () => {
    expect(parseDiceNotation('x')).toBeNull();
  });

  it('should return null for 0-sided dice', () => {
    expect(parseDiceNotation('1d0')).toBeNull();
  });
});
