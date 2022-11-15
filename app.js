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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const listen = () => {
    app.listen(port, () => {
      console.log('=================================');
      console.log(`======= ENV: ${env} =======`);
      console.log(`🚀 App listening on the port ${port}`);
      console.log('=================================');
    });
  };

  const initializeViewEngine = () => {
    app.set('views', join(__dirname, 'views'));
    app.set('view engine', 'pug');
  };

  const initializeMiddlewares = () => {
    app.use(morgan('dev'));
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(express.static(join(__dirname, 'public')));
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
      next(httpErrors(404))
    });

    app.use(notFoundMiddelware);
  }

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
