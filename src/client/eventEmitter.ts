import { DependencyList, useEffect, useState } from 'react';

export type TEventHander<T extends unknown[] = []> = (...args: T) => void;

export type TEventEmitter<T extends unknown[] = []> = {
  addEventListener: (callback: TEventHander<T>) => () => void;
  dispatchEvent: (...args: T) => void;
  useEventListener: (callback: TEventHander<T>, deps?: DependencyList) => void;
};

export const createEventEmitter = <
  T extends unknown[] = []
>(): TEventEmitter<T> => {
  const listeners = new Set<TEventHander<T>>();

  const addEventListener = (callback: TEventHander<T>) => {
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  };

  const dispatchEvent = (...args: T) => {
    [...listeners].forEach((callback) => {
      callback(...args);
    });
  };

  const useEventListener = (
    callback: TEventHander<T>,
    deps?: DependencyList
  ) => {
    useEffect(() => addEventListener(callback), deps);
  };

  return {
    addEventListener,
    dispatchEvent,
    useEventListener,
  };
};

export const useEventEmitter = <T extends unknown[] = []>() =>
  useState(createEventEmitter<T>)[0];
