export const groupConsecutiveBy = <T, K>(
  collection: T[],
  iteratee: (item: T) => K
): T[][] => {
  const groups: T[][] = [];
  let currentGroup: T[] = [];
  let currentKey: K | null = null;

  const flush = () => {
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  };

  collection.forEach((item) => {
    const key = iteratee(item);

    if (currentKey !== key) {
      flush();
      currentKey = key;
    }

    currentGroup.push(item);
  });

  flush();

  return groups;
};
