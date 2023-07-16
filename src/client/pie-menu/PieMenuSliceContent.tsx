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

import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { usePieMenuSliceContext } from './pieMenuSliceContext';

export interface PieMenuSliceContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PieMenuSliceContent = ({
  className,
  style = {},
  children,
  ...props
}: PieMenuSliceContentProps) => {
  const { skew, centralAngle, sliceRotation } = usePieMenuSliceContext();

  const offset = useMemo(() => {
    if (centralAngle > 90) return '25%';
    if (centralAngle === 90) return '54%';
    return '60%';
  }, [centralAngle]);

  return (
    <div
      className="absolute bottom-0 right-0 w-full h-full origin-bottom-right"
      style={{
        transform: `skew(${-skew}deg) rotate(${centralAngle / 2}deg)`,
      }}
    >
      <div
        className={twMerge('absolute bottom-0', className)}
        style={{
          right: offset,
          transform: `translate(50%, 50%) rotate(${
            -sliceRotation - centralAngle / 2
          }deg)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
