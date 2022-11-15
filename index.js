import App from './app.js';
import HomeRoute from './src/routes/home.js';
import UsersRoute from './src/routes/users.js';

const server = App([HomeRoute(), UsersRoute()]);

server.initializeViewEngine();
server.initializeMiddlewares();
server.initializeErrorHandling();
server.initializeRoutes();
server.initializeNotFoundRequestHandling();

server.listen();
