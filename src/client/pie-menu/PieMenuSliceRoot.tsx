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

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { usePieMenuContext } from './pieMenuContext';
import { PieMenuSliceProvider } from './pieMenuSliceContext';
import { useRegisterSlice } from './sliceRegistry';

export interface PieMenuSliceRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PieMenuSliceRoot = ({
  className,
  style = {},
  children,
  ...props
}: PieMenuSliceRootProps) => {
  const { startAngle, centralAngle, skew, isObtuse, registerSlice } =
    usePieMenuContext();

  const sliceData = useRegisterSlice(registerSlice);
  if (!sliceData) return null;
  const { index } = sliceData;

  const endAngle = centralAngle * index;
  const sliceRotation = startAngle + endAngle;

  return (
    <PieMenuSliceProvider sliceRotation={sliceRotation}>
      <button
        type="button"
        className={twMerge(
          'absolute aspect-square origin-bottom-right overflow-hidden no-webkit-tap-highlight',
          className
        )}
        style={{
          width: isObtuse ? '100%' : '50%',
          bottom: isObtuse ? '50%' : 'initial',
          right: isObtuse ? '50%' : 'initial',
          transform: `rotate(${sliceRotation}deg) skew(${skew}deg)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    </PieMenuSliceProvider>
  );
};
