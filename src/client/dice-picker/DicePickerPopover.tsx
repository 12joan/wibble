import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '../appContext';
import { KeepOnScreen } from '../KeepOnScreen';
import { DicePicker } from './DicePicker';
import { DicePickerProvider } from './dicePickerContext';

export interface DicePickerPoppoverProps {
  children: React.ReactNode;
}

export const DicePickerPoppover = ({ children }: DicePickerPoppoverProps) => {
  const { onBottomSheetOpenChange } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);

  onBottomSheetOpenChange.useEventListener((bottomSheetIsOpen) => {
    setBottomSheetIsOpen(bottomSheetIsOpen);
    setIsOpen(false);
  }, []);

  return (
    <div
      className="contents"
      // Drag
      onPointerDown={(event) => isOpen && event.stopPropagation()}
      onPointerMove={(event) => isOpen && event.stopPropagation()}
      onPointerUp={(event) => isOpen && event.stopPropagation()}
      onPointerCancel={(event) => isOpen && event.stopPropagation()}
      // Tab
      onKeyDownCapture={(event) => isOpen && event.stopPropagation()}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>

        <Popover.Content
          className={twMerge(
            'border bg-background z-40 rounded-xl drop-shadow-xl no-focus-ring w-64 animate-in zoom-in-95 fade-in',
            bottomSheetIsOpen
              ? 'origin-top-right slide-in-from-top-2'
              : 'origin-bottom-right md:origin-bottom slide-in-from-bottom-2'
          )}
          collisionPadding={16}
          onKeyDown={(event) => {
            event.stopPropagation();
            document.body.dispatchEvent(
              new KeyboardEvent('keydown', event.nativeEvent)
            );
          }}
          side={bottomSheetIsOpen ? 'bottom' : 'top'}
        >
          <KeepOnScreen nearSide={bottomSheetIsOpen ? 'top' : 'bottom'}>
            <div className="p-3">
              <DicePickerProvider
                isOpen={isOpen}
                close={() => setIsOpen(false)}
              >
                <DicePicker />
              </DicePickerProvider>
            </div>
          </KeepOnScreen>

          <Popover.Arrow asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 8"
              width={16}
              height={8}
              className="fill-background z-50 -translate-y-px"
              aria-hidden
            >
              <path d="M 16 0 L 8 8 L 0 0" />
            </svg>
          </Popover.Arrow>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
