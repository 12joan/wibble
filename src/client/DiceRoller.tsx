import React from 'react';
import { DicePickerPoppover } from './dice-picker/DicePickerPopover';
import { Button } from './Button';
import { DiceRollerLog } from './DiceRollerLog';
import { DiceRollerNotationInput } from './DiceRollerNotationInput';
import { DieIcon } from './DieIcon';

export interface DiceRollerProps {
  wrapControls: (children: React.ReactNode) => React.ReactNode;
}

export const DiceRoller = ({ wrapControls }: DiceRollerProps) => {
  return (
    <div className="h-full flex flex-col">
      <DiceRollerLog />

      {wrapControls(
        <div className="p-4 flex gap-2">
          <DiceRollerNotationInput />

          <DicePickerPoppover>
            <Button shape="icon" aria-label="Open dice picker">
              <DieIcon
                die={20}
                value={20}
                aria-hidden
                pathClassName="fill-current"
                valueClassName="fill-white dark:fill-black"
              />
            </Button>
          </DicePickerPoppover>
        </div>
      )}
    </div>
  );
};
