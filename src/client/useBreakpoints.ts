import tailwindConfig from 'tailwind-config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useViewportWidth } from './useViewportWidth';

const twConfig = resolveConfig(tailwindConfig);

export type TBreakpoints = Record<keyof typeof twConfig.theme.screens, boolean>;

export const useBreakpoints = (): TBreakpoints => {
  const viewportWidth = useViewportWidth();

  return Object.keys(twConfig.theme.screens).reduce((acc, breakpoint) => {
    acc[breakpoint] =
      viewportWidth >= parseInt(twConfig.theme.screens[breakpoint], 10);
    return acc;
  }, {} as TBreakpoints);
};
