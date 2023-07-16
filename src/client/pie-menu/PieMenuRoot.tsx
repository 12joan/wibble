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
import { PieMenuProvider } from './pieMenuContext';
import { useSliceRegistry } from './sliceRegistry';

export interface PieMenuRootProps extends React.HTMLAttributes<HTMLDivElement> {
  startAngleOffset?: number;
  children: React.ReactNode;
}

export const PieMenuRoot = ({
  startAngleOffset = 0,
  className,
  children,
  ...props
}: PieMenuRootProps) => {
  const { slices, registerSlice } = useSliceRegistry();

  const centralAngle = 360 / Math.max(slices.length, 1);
  const isPolar = centralAngle % 180 === 0;
  const deltaAngle = 90 - centralAngle;
  const startAngle = isPolar
    ? 45
    : startAngleOffset + deltaAngle + centralAngle / 2;
  const isObtuse = centralAngle > 90;

  return (
    <PieMenuProvider
      startAngle={startAngle}
      centralAngle={centralAngle}
      skew={deltaAngle}
      isObtuse={isObtuse}
      isPolar={isPolar}
      registerSlice={registerSlice}
    >
      <div
        className={twMerge(
          'relative rounded-full overflow-hidden aspect-square',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </PieMenuProvider>
  );
};
