/* eslint-disable no-case-declarations */
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { TDiceRollResultPart, TDiceRollResultPartDice, TDiceRollResultPartModifier } from '~/core/types';
import { DieIcon } from './DieIcon';
import { getDiceRollResultPartDiceInactiveValueIndices } from '~/core/dice/getDiceRollResultPartDiceInactiveValueIndices';

const textClassName = 'text-lg font-medium';

interface OperatorProps {
  children: string;
}

const Operator = ({ children }: OperatorProps) => (
  <span
    className={twMerge(textClassName, '-translate-y-0.5')}
    children={children}
  />
);

export interface DiceRollResultPartProps<T extends TDiceRollResultPart = TDiceRollResultPart> {
  part: T;
  isFirst: boolean;
}

const DiceRollResultPartDice = ({
  part,
  isFirst,
}: DiceRollResultPartProps<TDiceRollResultPartDice>) => {
  const inactiveValueIndices = useMemo(
    () => getDiceRollResultPartDiceInactiveValueIndices(part),
    [part],
  );

  return (
    <>
      {!isFirst && <Operator>+</Operator>}

      {part.values.map((value, index) => {
        const isInactive = inactiveValueIndices.includes(index);

        return (
          <DieIcon
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            die={part.die}
            value={value}
            pathClassName="fill-current"
            valueClassName="fill-white dark:fill-black"
            aria-label={`d${part.die} rolled ${value}${isInactive ? ' (not used)' : ''}`}
            style={{
              opacity: isInactive ? 0.5 : 1,
            }}
          />
        );
      })}
    </>
  );
};

const DiceRollResultPartModifier = ({
  part,
  isFirst,
}: DiceRollResultPartProps<TDiceRollResultPartModifier>) => {
  const { value } = part;
  const isNegative = value < 0;
  const showOperator = !isFirst || isNegative;

  return (
    <>
      {showOperator && <Operator>{isNegative ? '-' : '+'}</Operator>}

      <span
        className={twMerge(textClassName, '-translate-y-[0.0625rem]')}
        children={Math.abs(value)}
      />
    </>
  );
};

export const DiceRollResultPart = ({
  part,
  isFirst,
}: DiceRollResultPartProps) => {
  switch (part.type) {
    case 'dice':
      return <DiceRollResultPartDice part={part} isFirst={isFirst} />;

    case 'modifier':
      return <DiceRollResultPartModifier part={part} isFirst={isFirst} />;
  }
};
