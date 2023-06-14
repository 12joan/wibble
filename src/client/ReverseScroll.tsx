import React, { useCallback, useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';

export interface ReverseScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const ReverseScroll = ({
  className = '',
  children,
  ...props
}: ReverseScrollProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [lastSeenChildrenCount, setLastSeenChildrenCount] = useState(() =>
    React.Children.count(children)
  );
  const childrenCount = React.Children.count(children);
  const newChildrenCount = childrenCount - lastSeenChildrenCount;
  const showJumpToBottom = !isNearBottom && newChildrenCount > 0;

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
  }, [childrenCount, isNearBottom, scrollToBottom]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsNearBottom(isNearBottom);
    if (isNearBottom) setLastSeenChildrenCount(childrenCount);
  };

  return (
    <div
      ref={setContainer}
      className={twMerge('overflow-y-auto relative', className)}
      onScroll={handleScroll}
      {...props}
    >
      {children}

      {showJumpToBottom && (
        <div className="sticky bottom-5 inset-x-5 flex">
          <Button
            color="primary"
            className="mx-auto rounded-full flex gap-2 items-center"
            onClick={() => scrollToBottom(true)}
          >
            {newChildrenCount} new dice roll
            {newChildrenCount > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
};
