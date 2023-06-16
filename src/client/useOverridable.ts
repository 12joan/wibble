import { useEffect, useRef, useState } from 'react';

export const useOverridable = <T>(
  upstream: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(upstream);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setValue(upstream);
  }, [upstream]);

  return [value, setValue];
};
