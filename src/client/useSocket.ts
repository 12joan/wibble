import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { DiceRollRequest, DiceRollResult } from '../core/dice/types';
import { Socket } from '../core/socket/types';

export interface UseSocketOptions {
  onDiceRollResult: (result: DiceRollResult) => void;
}

export const useSocket = ({ onDiceRollResult }: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: Socket = io();
    setSocket(socket);

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
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
    performDiceRoll: (request: DiceRollRequest) => {
      if (socket) {
        socket.emit('diceRollRequest', request);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Socket not connected');
      }
    },
  };
};
