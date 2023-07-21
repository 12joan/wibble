export type TDie = number | '20A' | '20D';

export type TPostingAs = {
  id: string;
  name: string;
};

export type TDiceRollRequest = {
  label: string | null;
  postingAs: TPostingAs;
  parts: TDiceRollRequestPart[];
};

export type TDiceRollRequestPartDice = {
  type: 'dice';
  count: number;
  die: TDie;
};

export type TDiceRollRequestPartModifier = {
  type: 'modifier';
  value: number;
};

export type TDiceRollRequestPart =
  | TDiceRollRequestPartDice
  | TDiceRollRequestPartModifier;

export type TDiceRollResultPartDice = TDiceRollRequestPartDice & {
  values: number[];
};

export type TDiceRollResultPartModifier = TDiceRollRequestPartModifier;

export type TDiceRollResultPart =
  | TDiceRollResultPartDice
  | TDiceRollResultPartModifier;

export type TDiceRollResult = Omit<TDiceRollRequest, 'parts'> & {
  id: string;
  parts: TDiceRollResultPart[];
};

export type TProfile = {
  id: string;
  name: string;
  postingAsName: string;
  postingAsNameIsTemporary: boolean;
  favouriteDiceRolls: Omit<TDiceRollRequest, 'postingAs'>[];
};
