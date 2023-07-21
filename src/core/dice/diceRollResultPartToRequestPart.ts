import {
  TDiceRollRequestPart,
  TDiceRollResultPart,
  TDiceRollResultPartDice,
  TDiceRollResultPartModifier,
} from '../types';

const diceRollResultPartModifierToRequestPartModifier = (
  modifier: TDiceRollResultPartModifier
): TDiceRollRequestPart => modifier;

const diceRollResultPartDiceToRequestPartDice = ({
  type,
  count,
  die,
}: TDiceRollResultPartDice): TDiceRollRequestPart => ({
  type,
  count,
  die,
});

export const diceRollResultPartToRequestPart = (
  part: TDiceRollResultPart
): TDiceRollRequestPart => {
  switch (part.type) {
    case 'dice':
      return diceRollResultPartDiceToRequestPartDice(part);

    case 'modifier':
      return diceRollResultPartModifierToRequestPartModifier(part);
  }
};
