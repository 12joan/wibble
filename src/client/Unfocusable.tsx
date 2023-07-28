import React, { useLayoutEffect, useRef } from 'react';

export interface UnfocusableProps {
  disableFocus?: boolean;
  children: React.ReactNode;
}

export const Unfocusable = ({
  disableFocus = true,
  children,
}: UnfocusableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialTabIndices = useRef<WeakMap<HTMLElement, number | null>>(
    new WeakMap()
  );

  const setTabIndex = (element: HTMLElement, tabIndex: number | 'initial') => {
    const resolvedTabIndex: number | null | undefined =
      tabIndex === 'initial'
        ? initialTabIndices.current.get(element)
        : tabIndex;

    // Do not override existing value when setting to initial
    if (resolvedTabIndex === undefined) return;

    if (resolvedTabIndex === null) {
      element.removeAttribute('tabindex');
    } else {
      element.tabIndex = resolvedTabIndex;
    }
  };

  const processElement = (element: HTMLElement) => {
    if (disableFocus) {
      if (initialTabIndices.current.has(element)) {
        // eslint-disable-next-line no-console
        console.warn('Unfocusable: element is already processed', element);
        return;
      }

      initialTabIndices.current.set(
        element,
        element.hasAttribute('tabindex') ? element.tabIndex : null
      );

      setTabIndex(element, -1);
    } else {
      setTabIndex(element, 'initial');
      initialTabIndices.current.delete(element);
    }
  };

  const processElementAndChildren = (element: HTMLElement) => {
    processElement(element);

    Array.from(element.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        processElementAndChildren(child);
      }
    });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    processElementAndChildren(container);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              processElementAndChildren(node);
            }
          });
        }
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [disableFocus]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};
