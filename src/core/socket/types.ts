import { Server as TRawServer } from 'socket.io';
import { Socket as TRawSocket } from 'socket.io-client';
import { TDiceRollRequest, TDiceRollResult } from '../types';

export interface ClientToServerEvents {
  diceRollRequest: (request: TDiceRollRequest) => void;
  diceRollDelete: (id: TDiceRollResult['id']) => void;
}

export interface ServerToClientEvents {
  diceRollResult: (response: TDiceRollResult) => void;
  diceRollDelete: (id: TDiceRollResult['id']) => void;
  error: (message: string) => void;
}

export type TSocket = TRawSocket<ServerToClientEvents, ClientToServerEvents>;
export type TServer = TRawServer<ClientToServerEvents, ServerToClientEvents>;
