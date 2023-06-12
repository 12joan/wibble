import { Die } from '../core/dice/types';
import { DieSVGProps } from './DieSVG';

export type DieShape = Pick<
  DieSVGProps,
  'polygonSides' | 'rotation' | 'aria-label'
>;

const dieShapes: Record<Die | 'default', DieShape> = {
  default: { polygonSides: 6, rotation: 270 },
  4: { polygonSides: 3, rotation: 270, 'aria-label': 'd4' },
  6: { polygonSides: 4, rotation: 45, 'aria-label': 'd6' },
  8: { polygonSides: 4, rotation: 45, 'aria-label': 'd8' },
  10: { polygonSides: 10, rotation: 270, 'aria-label': 'd10' },
  12: { polygonSides: 10, rotation: 270, 'aria-label': 'd12' },
  20: { polygonSides: 6, rotation: 270, 'aria-label': 'd20' },
  '20A': { polygonSides: 6, rotation: 270, 'aria-label': 'd20' },
  '20D': { polygonSides: 6, rotation: 270, 'aria-label': 'd20' },
  100: { polygonSides: 10, rotation: 270, 'aria-label': 'd100' },
};

export const getDieShape = (die: Die): DieShape =>
  dieShapes[die] || {
    ...dieShapes.default,
    'aria-label': `d${die}`,
  };
