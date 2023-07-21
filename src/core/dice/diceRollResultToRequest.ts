import { TDiceRollRequest, TDiceRollResult } from '../types';
import { diceRollResultPartToRequestPart } from './diceRollResultPartToRequestPart';

export const diceRollResultToRequest = ({
  label,
  postingAs,
  parts,
}: TDiceRollResult): TDiceRollRequest => ({
  label,
  postingAs,
  parts: parts.map(diceRollResultPartToRequestPart),
});
