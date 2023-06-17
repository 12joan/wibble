import { useRef } from 'react';

export const useRenderCount = () => ++useRef(0).current;
