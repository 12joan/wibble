import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';

export const mountSocket = (server: HTTPServer) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
