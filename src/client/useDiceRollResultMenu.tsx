import React, { useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import {
  offset,
  shift,
  useClientPoint,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { twMerge } from 'tailwind-merge';
import { TDiceRollResult } from '../core/dice/types';
import { useAppContext } from './appContext';
import { buttonVariants } from './Button';
import { ExitAnimation } from './ExitAnimation';
import { PieMenu } from './pie-menu';

export interface UseDiceRollResultMenuOptions {
  result: TDiceRollResult;
}

export const useDiceRollResultMenu = ({
  result,
}: UseDiceRollResultMenuOptions) => {
  const { performDiceRoll, deleteDiceRoll, postingAs } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      // Center the popover on top of the reference
      offset(
        ({ rects }) => -rects.reference.height / 2 - rects.floating.height / 2
      ),
      shift({
        mainAxis: true,
        crossAxis: true,
        padding: 8,
      }),
    ],
  });

  const clientPoint = useClientPoint(
    context,
    pointerPosition || { enabled: false }
  );

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
    dismiss,
  ]);

  const actions = [
    {
      label: 'Re-roll',
      icon: Icons.SendPlusFill,
      onClick: () =>
        performDiceRoll({
          ...result,
          postingAs,
        }),
    },
    {
      label: 'Save',
      icon: Icons.FileEarmarkPlusFill,
      // eslint-disable-next-line no-alert
      onClick: () => alert('Not implemented yet'),
    },
    {
      label: 'Delete',
      icon: Icons.Trash3Fill,
      className: 'text-danger',
      onClick: () => deleteDiceRoll(result.id),
    },
  ];

  const menu = (
    <ExitAnimation isOpen={isOpen}>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-40 pointer-events-none"
      >
        <PieMenu className="w-32 backdrop-blur-lg shadow-lg border animate-in zoom-in exiting:animate-out exiting:zoom-out pointer-events-auto">
          {actions.map(({ label, icon: Icon, onClick, className }) => (
            <PieMenu.Slice
              key={label}
              className={twMerge(
                buttonVariants({ shape: 'custom', color: 'overlay' }),
                'rounded-none no-focus-ring border-0 group'
              )}
              aria-label={label}
              title={label}
              onClick={() => {
                onClick();
                setIsOpen(false);
              }}
            >
              <PieMenu.Slice.Content>
                <span className="group-focus-visible:focus-ring -m-1 p-1 rounded-full">
                  <Icon className={twMerge('text-primary', className)} />
                </span>
              </PieMenu.Slice.Content>
            </PieMenu.Slice>
          ))}

          <PieMenu.Center className="w-6" />
        </PieMenu>
      </div>
    </ExitAnimation>
  );

  return {
    menu,
    menuIsOpen: isOpen,
    setMenuIsOpen: setIsOpen,
    getReferenceProps,
    setReference: refs.setReference,
    setPointerPosition,
  };
};
