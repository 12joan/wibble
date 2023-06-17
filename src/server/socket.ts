import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { performDiceRollRequest } from '../core/dice/performDiceRollRequest';
import { TServer } from '../core/socket/types';
import { randomDieRoll } from './randomDieRoll';

export const mountSocket = (server: HTTPServer) => {
  const io: TServer = new Server(server);

  io.on('connection', (socket) => {
    socket.on('diceRollRequest', async (request) => {
      try {
        const result = await performDiceRollRequest(request, { randomDieRoll });

        if (result) {
          io.emit('diceRollResult', result);
        } else {
          socket.emit('error', 'performDiceRollRequest returned null');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        socket.emit('error', 'Error in diceRollRequest');
      }
    });
  });
};
