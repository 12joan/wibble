export const getD100Labels = (value: number): [string, string] => {
  const tens = value >= 10 ? Math.floor((value / 10) % 10) * 10 : 0;
  const ones = value % 10;
  return [tens.toString().padStart(2, '0'), ones.toString()];
};
