import 'dotenv/config';
import express from 'express';
import { ValidationError } from 'yup';

import '~/database';
import routes from '~/routes';

class App {
  constructor() {
    this.server = express();
    this.routes();
    this.exceptionHandler();
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof ValidationError) {
        const errors = err.inner.map(({ path, type, message }) => ({
          path,
          type,
          message,
        }));
        const { message } = err;
        return res.status(400).json({ message, errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  listen(port) {
    this.server.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  }
}

export default App;
