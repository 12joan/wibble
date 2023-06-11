import express from 'express';
import ViteExpress from 'vite-express';
import { mountSocket } from './socket';

const app = express();

const server = ViteExpress.listen(app, 3000, () =>
  // eslint-disable-next-line no-console
  console.log('Server is listening on port 3000...')
);

mountSocket(server);
