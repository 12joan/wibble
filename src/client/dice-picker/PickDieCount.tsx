import React from 'react';
import { BackAndCancel } from './BackAndCancel';
import { NavMenuItem } from './MenuItem';
import {
  TDicePickerState,
  useDicePickerState,
  useNavigateWithState,
} from './state';
import { useCustomNumberInput } from './useCustomNumberInput';

const destination = '/pick-modifier';

export const PickDieCount = () => {
  const state = useDicePickerState();
  const { composingDie } = state;
  if (!composingDie) throw new Error('composingDie is not set');

  const navigate = useNavigateWithState();

  const [customCount, customCountInput] = useCustomNumberInput({
    placeholder: `Nd${composingDie}`,
    inputAriaLabel: 'Custom count',
    validateInput: (value) => !/[^0-9]/.test(value),
    validateNumber: (value) => value >= 1,
  });

  const finalizeWithCount = (count: number) => (): TDicePickerState => ({
    ...state,
    composingDie: null,
    diceRollRequestParts: [
      ...state.diceRollRequestParts,
      {
        type: 'dice',
        die: composingDie,
        count,
      },
    ],
  });

  const handleCustomCountSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (customCount === null) return;

    navigate(destination, {
      transformState: finalizeWithCount(customCount),
    });
  };

  return (
    <>
      <BackAndCancel />

      <h1 className="font-medium">How many d{composingDie}?</h1>

      <div>
        <form onSubmit={handleCustomCountSubmit}>{customCountInput}</form>

        {Array.from({ length: 8 }, (_, i) => 8 - i).map((count) => (
          <NavMenuItem
            key={count}
            to={destination}
            transformState={finalizeWithCount(count)}
            children={`${count}d${composingDie}`}
          />
        ))}
      </div>
    </>
  );
};
