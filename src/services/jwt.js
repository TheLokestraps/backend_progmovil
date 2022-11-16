import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException.js';

const JwtServices = () => {
  const blacklistData = [];

  const secret = process.env.JWT_SECRET || 'mySecret';

  /**
   *
   * @param {Email} email Userid
   * @returns {String}
   */
  const generateAccessToken = (email) => {
    console.log(secret);
    return jwt.sign({ email }, secret, { expiresIn: '1d' });
  };

  const toBlacklist = async (token) => {
    blacklistData.push(token);
  };

  /**
   *
   * @param {String} token
   * @returns {{ email: String }}
   */
  const verifyAccessToken = (token) => {
    const bannedToken = blacklistData.find((element) => element === token);
    if (bannedToken) throw new HttpException(401, 'Invalid token');

    return jwt.verify(token, secret);
  };

  return {
    generateAccessToken,
    verifyAccessToken,
    toBlacklist,
  };
};

export default JwtServices;
