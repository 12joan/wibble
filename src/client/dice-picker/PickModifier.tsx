import React from 'react';
import { BackAndCancel } from './BackAndCancel';
import { NavMenuItem } from './MenuItem';
import {
  TDicePickerState,
  useDicePickerState,
  useNavigateWithState,
} from './state';
import { useCustomNumberInput } from './useCustomNumberInput';

const destination = '/review-dice-roll';

export const PickModifier = () => {
  const state = useDicePickerState();
  const navigate = useNavigateWithState();

  const [customModifier, customModifierInput] = useCustomNumberInput({
    placeholder: '±N',
    inputAriaLabel: 'Custom modifier',
    validateInput: (value) => /^[-+]?[0-9]*$/.test(value),
  });

  const addModifier = (value: number) => (): TDicePickerState => ({
    ...state,
    diceRollRequestParts: [
      ...state.diceRollRequestParts,
      {
        type: 'modifier',
        value,
      },
    ],
  });

  const handleCustomModifierSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (customModifier === null) return;

    navigate(destination, {
      transformState: addModifier(customModifier),
    });
  };

  return (
    <>
      <BackAndCancel />

      <h1 className="font-medium">Add a modifier</h1>

      <div>
        <form onSubmit={handleCustomModifierSubmit}>{customModifierInput}</form>

        {Array.from({ length: 9 }, (_, i) => 9 - i).map((modifier) => (
          <NavMenuItem
            key={modifier}
            to={destination}
            transformState={addModifier(modifier)}
            children={`+${modifier}`}
          />
        ))}

        <NavMenuItem to={destination} children="No modifier" />
      </div>
    </>
  );
};
