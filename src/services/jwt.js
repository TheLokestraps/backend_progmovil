import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import HttpException from "../exceptions/HttpException.js";

const jwtServices = () => {

  const blacklistData = [];

  const secret = process.env.JWT_SECRET || "mySecret";
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
    blacklistData.forEach((element) => {
      if (token === element) {
        throw new HttpException(401, `Invalid token`);
      }
    });
    return jwt.verify(token, secret);
  };

  return{
    generateAccessToken,
    verifyAccessToken,
    toBlacklist,
  };
};

export default jwtServices;
