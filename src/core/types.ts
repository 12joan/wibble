export type Die = number | '20A' | '20D';

export type DiceRollRequest = {
  label: string | null;
  parts: DiceRollRequestPart[];
};

export type DiceRollRequestPartDice = {
  type: 'dice';
  count: number;
  die: Die;
};

export type DiceRollRequestPartModifier = {
  type: 'modifier';
  value: number;
};

export type DiceRollRequestPart =
  | DiceRollRequestPartDice
  | DiceRollRequestPartModifier;

export type DiceRollResult = {
  request: DiceRollRequest;
  partsDieValues: number[][];
};
