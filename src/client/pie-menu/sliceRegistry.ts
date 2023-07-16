/**
 * MIT License
 *
 * Copyright (c) 2022 psychobolt, Joe Anderson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useCallback, useLayoutEffect, useState } from 'react';
import { TRegisterSlice, TSliceData, TSliceRecord } from './types';

let nextSliceId = 0;

export const useSliceRegistry = () => {
  const [slices, setSlices] = useState<TSliceRecord[]>([]);

  const registerSlice: TRegisterSlice = useCallback((setSliceData) => {
    const id = nextSliceId++;

    setSlices((prevSlices) => [...prevSlices, { id, setSliceData }]);

    return () => {
      setSlices((prevSlices) => prevSlices.filter((slice) => slice.id !== id));
    };
  }, []);

  useLayoutEffect(() => {
    slices.forEach(({ setSliceData }, index) => {
      setSliceData({ index });
    });
  }, [slices]);

  return { slices, registerSlice };
};

export const useRegisterSlice = (
  registerSlice: TRegisterSlice
): TSliceData | null => {
  const [sliceData, setSliceData] = useState<TSliceData | null>(null);
  useLayoutEffect(() => registerSlice(setSliceData), [registerSlice]);
  return sliceData;
};
