import HttpException from '../exceptions/HttpException.js';
import JwtService from '../services/jwt.js';

const jwtService = JwtService();

function authMiddleware(req, _res, next) {
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    if (accessToken == null) {
      throw new HttpException(401, 'Invalid token');
    }

    const user = jwtService.verifyAccessToken(accessToken);

    const isUserAuthorized = (userEmail) => {
      if (user.email !== userEmail) {
        throw new HttpException(403, 'User not authorized');
      }
    };

    req.user = user;
    req.isUserAuthorized = isUserAuthorized;
    next();
  } catch ({ message, statusCode }) {
    next(new HttpException(statusCode || 400, message));
  }
}
export default authMiddleware;
