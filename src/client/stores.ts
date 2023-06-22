import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type TInitialValue<T> = T | (() => T);
export type TSetter<T> = SetStateAction<T>;

export const resolveInitialValue = <T>(initialValue: TInitialValue<T>): T => {
  return typeof initialValue === 'function'
    ? (initialValue as () => T)()
    : initialValue;
};

export const resolveSetter = <T>(setter: TSetter<T>, prevValue: T): T => {
  return typeof setter === 'function'
    ? (setter as (prevValue: T) => T)(prevValue)
    : setter;
};

export type TStore<T> = {
  get: () => T;
  set: Dispatch<TSetter<T>>;
  use: () => [T, Dispatch<TSetter<T>>];
};

export const useMemoryStore = <T>(
  initialValue: TInitialValue<T>
): TStore<T> => {
  const [value, setValue] = useState<T>(initialValue);

  return useMemo(
    () => ({
      get: () => value,
      set: setValue,
      use: () => [value, setValue],
    }),
    [value, setValue]
  );
};

export const useLocalStorageStore = <T>(
  key: string,
  initialValue: TInitialValue<T>,
  {
    version = 1,
    migrate,
  }: {
    version?: number;
    migrate?: (value: unknown, version: number) => T;
  } = {}
): TStore<T> => {
  type StoredValue = {
    version: number;
    value: T;
  };

  const [value, rawSetValue] = useState<T>(() => {
    const storedValueJson = localStorage.getItem(key);
    if (!storedValueJson) return resolveInitialValue(initialValue);

    const storedValue: StoredValue = JSON.parse(storedValueJson);

    if (storedValue.version !== version) {
      if (!migrate) return resolveInitialValue(initialValue);
      return migrate(storedValue.value, storedValue.version);
    }

    return storedValue.value;
  });

  const setValue = useCallback(
    (newValue: TSetter<T>) => {
      const resolvedNewValue = resolveSetter(newValue, value);

      rawSetValue(resolvedNewValue);

      const storedValue: StoredValue = {
        version,
        value: resolvedNewValue,
      };

      localStorage.setItem(key, JSON.stringify(storedValue));
    },
    [value, rawSetValue, key, version]
  );

  return useMemo(
    () => ({
      get: () => value,
      set: setValue,
      use: () => [value, setValue],
    }),
    [value, setValue]
  );
};
