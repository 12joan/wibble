import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { TSocket } from '../core/socket/types';
import { TDiceRollRequest, TDiceRollResult } from '../core/types';

export interface UseSocketOptions {
  onDiceRollResult: (result: TDiceRollResult) => void;
  onDiceRollDelete: (id: TDiceRollResult['id']) => void;
}

export const useSocket = ({
  onDiceRollResult,
  onDiceRollDelete,
}: UseSocketOptions) => {
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
    socket?.on('diceRollDelete', onDiceRollDelete);

    return () => {
      socket?.off('diceRollResult', onDiceRollResult);
      socket?.off('diceRollDelete', onDiceRollDelete);
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
    deleteDiceRoll: (id: TDiceRollResult['id']) => {
      if (socket) {
        socket.emit('diceRollDelete', id);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Socket not connected');
      }
    },
  };
};
