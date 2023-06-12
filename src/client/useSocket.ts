import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { TDiceRollRequest, TDiceRollResult } from '../core/dice/types';
import { TSocket } from '../core/socket/types';

export interface UseSocketOptions {
  onDiceRollResult: (result: TDiceRollResult) => void;
}

export const useSocket = ({ onDiceRollResult }: UseSocketOptions) => {
  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: TSocket = io();
    setSocket(socket);

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('error', (message) => {
      // eslint-disable-next-line no-console
      console.error(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on('diceRollResult', onDiceRollResult);

    return () => {
      socket?.off('diceRollResult', onDiceRollResult);
    };
  }, [socket, onDiceRollResult]);

  return {
    isConnected,
    performDiceRoll: (request: TDiceRollRequest) => {
      if (socket) {
        socket.emit('diceRollRequest', request);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Socket not connected');
      }
    },
  };
};
