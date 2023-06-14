import { groupConsecutiveBy } from './groupConsecutiveBy';

type TestItem = {
  key: number;
  value: string;
};

const items: TestItem[] = [
  { key: 1, value: 'a' },
  { key: 1, value: 'b' },
  { key: 2, value: 'c' },
  { key: 2, value: 'd' },
  { key: 1, value: 'e' },
  { key: 3, value: 'f' },
  { key: 3, value: 'g' },
];

describe('groupConsecutiveBy', () => {
  it('should group consecutive items by the given function', () => {
    const result = groupConsecutiveBy(items, (item) => item.key);

    expect(result).toEqual([
      [
        { key: 1, value: 'a' },
        { key: 1, value: 'b' },
      ],
      [
        { key: 2, value: 'c' },
        { key: 2, value: 'd' },
      ],
      [{ key: 1, value: 'e' }],
      [
        { key: 3, value: 'f' },
        { key: 3, value: 'g' },
      ],
    ]);
  });
});
