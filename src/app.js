import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import '~/database';
import routes from '~/routes';
import { ValidationError, NotFoundError } from '~/app/errors';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof ValidationError)
        return res
          .status(400)
          .json({ error: 'ValidationError', message: err.message });
      if (err instanceof NotFoundError)
        return res
          .status(404)
          .json({ error: 'NotFoundError', message: err.message });
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
