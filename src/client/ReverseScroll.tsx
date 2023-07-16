import React, { useCallback, useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';

export interface ReverseScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  itemCount: number;
  children: React.ReactNode;
}

export const ReverseScroll = ({
  className = '',
  itemCount,
  children,
  ...props
}: ReverseScrollProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [lastSeenItemCount, setLastSeenItemCount] = useState(itemCount);
  const newItemCount = itemCount - lastSeenItemCount;
  const showJumpToBottom = !isNearBottom && newItemCount > 0;

  const scrollToBottom = useCallback(
    (smooth = false) => {
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    },
    [container]
  );

  /**
   * When children change while near bottom, scroll to bottom. Also triggers
   * on mount.
   */
  useLayoutEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [itemCount, scrollToBottom]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsNearBottom(isNearBottom);
    if (isNearBottom) setLastSeenItemCount(itemCount);
  };

  return (
    <div
      ref={setContainer}
      className={twMerge('overflow-y-auto', className)}
      onScroll={handleScroll}
      {...props}
    >
      {children}

      {showJumpToBottom && (
        <div className="sticky bottom-5 inset-x-5 flex z-20">
          <Button
            color="primary"
            className="mx-auto rounded-full flex gap-2 items-center"
            onClick={() => scrollToBottom(true)}
          >
            {newItemCount} new dice roll
            {newItemCount > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
};
