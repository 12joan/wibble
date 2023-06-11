import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { performDiceRollRequest } from '../core/dice/performDiceRollRequest';
import { Server as TServer } from '../core/socket/types';
import { randomDieRoll } from './randomDieRoll';

export const mountSocket = (server: HTTPServer) => {
  const io: TServer = new Server(server);

  io.on('connection', (socket) => {
    socket.on('diceRollRequest', async (request) => {
      const result = await performDiceRollRequest(request, { randomDieRoll });
      socket.emit('diceRollResult', result);
    });
  });
};
