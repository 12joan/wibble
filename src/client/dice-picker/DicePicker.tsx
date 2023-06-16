import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useDicePickerContext } from './dicePickerContext';
import { PickDieCount } from './PickDieCount';
import { PickDieType } from './PickDieType';
import { PickModifier } from './PickModifier';
import { ReviewDiceRoll } from './ReviewDiceRoll';
import { useNavigateWithState } from './state';

const DicePickerContent = () => {
  const navigate = useNavigateWithState();
  const { isOpen } = useDicePickerContext();

  useHotkeys(['ctrl+z', 'meta+z'], () => navigate({ to: -1 }), {
    enabled: isOpen,
  });

  useHotkeys(['meta+shift+z', 'ctrl+y'], () => navigate({ to: 1 }), {
    enabled: isOpen,
  });

  return (
    <div className="space-y-2">
      <Outlet />
    </div>
  );
};

export const DicePicker = () => {
  const [router] = useState(() =>
    createMemoryRouter(
      [
        {
          path: '/',
          element: <DicePickerContent />,
          children: [
            { path: '/pick-die-type', element: <PickDieType /> },
            { path: '/pick-die-count', element: <PickDieCount /> },
            { path: '/pick-modifier', element: <PickModifier /> },
            { path: '/review-dice-roll', element: <ReviewDiceRoll /> },
          ],
        },
      ],
      { initialEntries: ['/pick-die-type'] }
    )
  );

  return <RouterProvider router={router} />;
};
