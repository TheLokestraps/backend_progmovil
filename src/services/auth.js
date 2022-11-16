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

    return accessToken;
  };

  return {
    login,
  };
};

export default AuthService;
