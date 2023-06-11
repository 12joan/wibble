import express from 'express';
import ViteExpress from 'vite-express';
import { TEST_CONSTANT } from '../common/constants';

const app = express();

app.get('/hello', (_, res) => {
  res.send(TEST_CONSTANT);
});

ViteExpress.listen(app, 3000, () =>
  // eslint-disable-next-line no-console
  console.log('Server is listening on port 3000...')
);
