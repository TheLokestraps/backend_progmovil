import App from './app.js';
import AuthRoute from './src/routes/auth.js';
import HomeRoute from './src/routes/home.js';
import ParkingsRoute from './src/routes/parkings.js';
import PaymentsRoute from './src/routes/payments.js';
import UsersRoute from './src/routes/users.js';
import VehiclesRoute from './src/routes/vehicles.js';

const server = App([AuthRoute(), HomeRoute(), ParkingsRoute(), PaymentsRoute(), UsersRoute(), VehiclesRoute()]);

server.initializeViewEngine();
server.initializeMiddlewares();
server.initializeErrorHandling();
server.initializeRoutes();
server.initializeNotFoundRequestHandling();

server.listen();
