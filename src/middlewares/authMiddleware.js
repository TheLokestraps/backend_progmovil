import HttpException from "../exceptions/HttpException.js";

import { verifyAccessToken } from "../services/jwt.js";

function authMiddleware(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    if (accessToken == null) {
      throw new HttpException(401, `Invalid token`);
    }

    const user = verifyAccessToken(accessToken);

    const isUserAuthorized = (userEmail) => {
      if (user.email !== userEmail) {
        throw new HttpException(403, `User not authorized`);
      }
    };

    req.user = user;
    req.isUserAuthorized = isUserAuthorized;
    next();
    
  } catch ({ message, statusCode }) {
    next(new HttpException(statusCode || 400, message));
  }
}

module.exports = {
  authMiddleware,
};
