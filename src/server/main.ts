import express from 'express';
import ViteExpress from 'vite-express';
import { mountSocket } from './socket';

const app = express();

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || 'localhost';

const server = app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://${host}:${port}`);
});

mountSocket(server);

ViteExpress.bind(app, server);
