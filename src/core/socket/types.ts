import { Server as RawServer } from 'socket.io';
import { Socket as RawSocket } from 'socket.io-client';
import { DiceRollRequest, DiceRollResult } from '../dice/types';

export interface ClientToServerEvents {
  diceRollRequest: (request: DiceRollRequest) => void;
}

export interface ServerToClientEvents {
  diceRollResult: (response: DiceRollResult) => void;
}

export type Socket = RawSocket<ServerToClientEvents, ClientToServerEvents>;
export type Server = RawServer<ClientToServerEvents, ServerToClientEvents>;
