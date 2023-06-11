import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
