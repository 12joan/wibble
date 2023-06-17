import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Button } from '../Button';
import { useDicePickerContext } from './dicePickerContext';
import { useDicePickerState, useNavigateWithState } from './state';

export const BackAndCancel = () => {
  const navigate = useNavigateWithState();
  const { close } = useDicePickerContext();
  const { isFirstPage } = useDicePickerState();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        onClick={() => navigate({ to: -1 })}
        shape="link"
        color="link"
        className="flex items-center gap-1"
        disabled={isFirstPage}
      >
        <Icons.CaretLeftFill aria-hidden />
        Back
      </Button>

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
