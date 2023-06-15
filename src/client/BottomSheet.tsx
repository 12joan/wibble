import React, { useRef, useState } from 'react';
import {
  BottomSheet as UpstreamBottomSheet,
  BottomSheetRef,
} from '@12joan/react-spring-bottom-sheet';
import FocusTrap from 'focus-trap-react';
import { throttle } from 'lodash';
import { useAppContext } from './appContext';
import { Unfocusable } from './Unfocusable';

import './bottom-sheet.css';

type TBottomSheetState = 'expanded' | 'collapsed';

const getMaxHeight = () => window.innerHeight * 0.85;

const getSnapPoint = (
  {
    headerHeight,
  }: {
    headerHeight: number;
  },
  state: TBottomSheetState
) => (state === 'collapsed' ? headerHeight : getMaxHeight());

export interface BottomSheetProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const BottomSheet = ({ header, children }: BottomSheetProps) => {
  const { onPerformDiceRoll } = useAppContext();

  const sheetRef = useRef<BottomSheetRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [throttledSetHeaderHeight] = useState(() =>
    throttle(setHeaderHeight, 100)
  );

  const snapTo = (state: TBottomSheetState, source?: string) => {
    sheetRef.current?.snapTo((ctx) => getSnapPoint(ctx, state), { source });
  };

  const toggleOpen = () => snapTo(isOpen ? 'collapsed' : 'expanded');

  onPerformDiceRoll.useEventListener(() => snapTo('collapsed'), []);

  return (
    <>
      <div style={{ height: headerHeight }} className="shrink-0" />

      <UpstreamBottomSheet
        ref={sheetRef}
        open
        onDismiss={() => snapTo('collapsed', 'dragging')}
        blocking={isOpen}
        scrollLocking={false}
        snapPoints={(ctx) => {
          setTimeout(() => {
            throttledSetHeaderHeight(ctx.headerHeight);
          }, 0);

          return [
            getSnapPoint(ctx, 'collapsed'),
            getSnapPoint(ctx, 'expanded'),
          ];
        }}
        skipInitialTransition
        onSpringStart={() => {
          requestAnimationFrame(() => {
            const { height } = sheetRef.current!;
            setIsOpen(height >= getMaxHeight() * 0.9);
          });
        }}
        sibling={
          <div
            className="fixed inset-0 bg-black transition-opacity duration-500 z-20"
            style={{
              opacity: isOpen ? 0.5 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            onClick={() => snapTo('collapsed')}
          />
        }
        header={
          <div className="flex flex-col">
            <button
              type="button"
              onClick={toggleOpen}
              className="w-full p-4 group -mb-4 z-10 no-focus-ring"
              aria-label={isOpen ? 'Collapse sheet' : 'Expand sheet'}
            >
              <div className="mx-auto max-w-[100px] w-full h-1.5 bg-slate-200 group-hocus:bg-slate-300 dark:bg-slate-600 dark:group-hocus:bg-slate-500 rounded-full group-focus-visible:focus-ring ring-offset-2" />
            </button>

            {header}
          </div>
        }
        renderAbove={(children) => (
          <FocusTrap active={isOpen}>
            <div className="contents" children={children} />
          </FocusTrap>
        )}
      >
        <div className="contents" aria-hidden={!isOpen}>
          <Unfocusable disableFocus={!isOpen} children={children} />
        </div>
      </UpstreamBottomSheet>
    </>
  );
};
