import jwt from 'jsonwebtoken';

const JwtServices = () => {
  const secret = process.env.JWT_SECRET || 'mySecret';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'myRefreshSecret';

  /**
   * @param {Email} email Userid
   * @param {Boolean} refresh flag
   * @returns {String}
   */
  const generateAccessToken = (email, refresh) => {
    if (refresh) {
      return jwt.sign({ email }, refreshSecret);
    }
    return jwt.sign({ email }, secret, { expiresIn: '1d' });
  };

  /**
   * @param {String} token
   * @returns {{ email: String }}
   */
  const verifyAccessToken = (token, refresh) => {
    if (refresh) {
      return jwt.verify(token, refreshSecret);
    }
    return jwt.verify(token, secret);
  };

  return {
    generateAccessToken,
    verifyAccessToken,
  };
};

export default JwtServices;
