import { Server as TRawServer } from 'socket.io';
import { Socket as TRawSocket } from 'socket.io-client';
import { TDiceRollRequest, TDiceRollResult } from '../dice/types';

export interface ClientToServerEvents {
  diceRollRequest: (request: TDiceRollRequest) => void;
}

export interface ServerToClientEvents {
  diceRollResult: (response: TDiceRollResult) => void;
  error: (message: string) => void;
}

export type TSocket = TRawSocket<ServerToClientEvents, ClientToServerEvents>;
export type TServer = TRawServer<ClientToServerEvents, ServerToClientEvents>;
