import React, { useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useClientPoint,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { omit } from 'lodash';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from './appContext';
import { buttonVariants } from './Button';
import { PieMenu } from './pie-menu';

import { diceRollResultToRequest } from '~/core/dice/diceRollResultToRequest';
import { TDiceRollResult } from '~/core/types';

export interface UseDiceRollResultMenuOptions {
  result: TDiceRollResult;
}

export const useDiceRollResultMenu = ({
  result,
}: UseDiceRollResultMenuOptions) => {
  const {
    performDiceRoll,
    deleteDiceRoll,
    postingAs,
    currentProfileStore,
    isConnected,
  } = useAppContext();
  const [, setCurrentProfile] = currentProfileStore.use();
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
      onClick: () =>
        setCurrentProfile((profile) => ({
          ...profile,
          favouriteDiceRolls: [
            ...profile.favouriteDiceRolls,
            omit(diceRollResultToRequest(result), 'postingAs'),
          ],
        })),
    },
    {
      label: 'Delete',
      icon: Icons.Trash3Fill,
      className: 'text-danger',
      onClick: () => deleteDiceRoll(result.id),
    },
  ];

  const menu = isOpen && (
    <FloatingOverlay>
      <FloatingPortal>
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-40 pointer-events-none"
          >
            <PieMenu className="w-32 backdrop-blur-lg shadow-lg border animate-in zoom-in pointer-events-auto">
              {actions.map(({ label, icon: Icon, onClick, className }) => (
                <PieMenu.Slice
                  key={label}
                  className={twMerge(
                    buttonVariants({ shape: 'custom', color: 'overlay' }),
                    'rounded-none no-focus-ring border-0 group'
                  )}
                  disabled={!isConnected}
                  aria-label={label}
                  title={label}
                  onClick={() => {
                    onClick();
                    setIsOpen(false);
                  }}
                >
                  <PieMenu.Slice.Content>
                    <div className="group-focus-visible:focus-ring -m-2 p-2 rounded-lg">
                      <Icon className={twMerge('text-primary', className)} />
                    </div>
                  </PieMenu.Slice.Content>
                </PieMenu.Slice>
              ))}

              <PieMenu.Center className="w-6" />
            </PieMenu>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    </FloatingOverlay>
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
