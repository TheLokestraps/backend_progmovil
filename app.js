/* eslint-disable no-console */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import httpErrors from 'http-errors';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import errorMiddleware from './src/middlewares/error.js';
import notFoundMiddelware from './src/middlewares/not-found.js';

const App = (routes) => {
  const app = express();
  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'development';
  const systemFilename = fileURLToPath(import.meta.url);
  const systemDirname = dirname(systemFilename);

  const listen = () => {
    app.listen(port, () => {
      console.info('=================================');
      console.info(`======= ENV: ${env} =======`);
      console.info(`🚀 App listening on the port ${port}`);
      console.info('=================================');
    });
  };

  const initializeViewEngine = () => {
    app.set('views', join(systemDirname, 'views'));
    app.set('view engine', 'pug');
  };

  const initializeMiddlewares = () => {
    app.use(morgan('dev'));
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(express.static(join(systemDirname, 'public')));
  };

  const initializeRoutes = () => {
    routes.forEach((route) => {
      app.use('/', route.router);
    });
  };

  const initializeErrorHandling = () => {
    app.use(errorMiddleware);
  };

  const initializeNotFoundRequestHandling = () => {
    app.use((_req, _res, next) => {
      next(httpErrors(404));
    });

    app.use(notFoundMiddelware);
  };

  return {
    initializeErrorHandling,
    initializeMiddlewares,
    initializeNotFoundRequestHandling,
    initializeViewEngine,
    initializeRoutes,
    listen,
  };
};

export default App;
