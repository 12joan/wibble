import React from 'react';
import { BackButton } from '../BackButton';
import { Button } from '../Button';
import { useDicePickerContext } from './dicePickerContext';
import { useDicePickerState, useNavigateWithState } from './state';

export const BackAndCancel = () => {
  const navigate = useNavigateWithState();
  const { close } = useDicePickerContext();
  const { isFirstPage } = useDicePickerState();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <BackButton navigate={navigate} disabled={isFirstPage} />

      <Button
        onClick={() => close()}
        shape="link"
        color="link"
        className="ml-auto"
      >
        Cancel
      </Button>
    </div>
  );
};
