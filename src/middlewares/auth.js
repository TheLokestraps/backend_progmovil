import JwtService from '../services/jwt.js';
import HttpException from '../exceptions/HttpException.js';
import UserService from '../services/users.js';

const jwtService = JwtService();
const userService = UserService();

const authMiddleware = async (req, _res, next) => {
  try {
    const authorization = req.cookies.Authorization || req.header('Authorization').split('Bearer ')[1] || null;

    if (authorization) {
      const verifyToken = jwtService.verifyAccessToken(authorization);
      const userEmail = verifyToken.email;

      if (userEmail) {
        const user = await userService.findUserByEmail(userEmail);

        req.user = user;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token.'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing.'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token.'));
  }
};

export default authMiddleware;
