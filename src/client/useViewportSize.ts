import { useElementSize } from './useElementSize';

export const useViewportSize = () => {
  const [size] = useElementSize(document.body);
  return size;
};
