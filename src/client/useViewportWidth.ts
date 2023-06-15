import { useEffect, useState } from 'react';

const getViewportWidth = () => document.documentElement.clientWidth;

export const useViewportWidth = () => {
  const [width, setWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => setWidth(getViewportWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
