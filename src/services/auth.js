import bcrypt from 'bcrypt';

import HttpException from '../exceptions/HttpException.js';
import jwtServices from './jwt.js';
import UserService from './users.js';

const AuthService = () => {
  const userService = UserService();
  const JwtServices = jwtServices();

  const login = async (userData) => {
    if (!userData) throw new HttpException(400, 'User data not available.');

    const user = await userService.findUserByEmail(userData.email);
    const isPasswordMatching = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordMatching) throw new HttpException(409, "Your password don't matching.");

    const accessToken = JwtServices.generateAccessToken(user.email);
    const refreshToken = JwtServices.generateAccessToken(user.email, true);

    return { accessToken, refreshToken };
  };

  const refresh = async (email, refreshToken) => {
    if (!email) throw new HttpException(400, 'Email data not available.');
    if (!refreshToken) throw new HttpException(400, 'Refresh token not available.');

    const user = await userService.findUserByEmail(email);
    const verifyToken = JwtServices.verifyAccessToken(refreshToken, true);
    if (verifyToken.email !== user.email) throw new HttpException(403, 'Invalid Refresh token.');

    const accessToken = JwtServices.generateAccessToken(user.email);

    return accessToken;
  };

  return {
    login,
    refresh,
  };
};

export default AuthService;
