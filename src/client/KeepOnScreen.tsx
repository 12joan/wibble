import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useElementBounds } from './useElementBounds';
import { useRenderCount } from './useRenderCount';
import { useViewportSize } from './useViewportSize';

export interface KeepOnScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nearSide: 'top' | 'bottom';
}

export const KeepOnScreen = ({
  nearSide,
  className,
  children,
}: KeepOnScreenProps) => {
  const { height: viewportHeight } = useViewportSize();
  const [{ top, bottom }, containerRef] = useElementBounds();
  const renderCount = useRenderCount();

  const nearSideOffset = nearSide === 'top' ? top : viewportHeight - bottom;
  const maxHeight = viewportHeight - nearSideOffset - 16;

  return (
    <div
      ref={containerRef}
      className={twMerge('overflow-y-auto', className)}
      style={{ maxHeight: renderCount > 2 ? maxHeight : undefined }}
    >
      {children}
    </div>
  );
};
