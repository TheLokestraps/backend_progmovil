import AuthService from '../services/auth.js';

const AuthController = () => {
  const authService = AuthService();

  const login = async (req, res, next) => {
    try {
      const userData = req.body;
      const loginUser = await authService.login(userData);

      res.status(201).json({ data: loginUser, message: 'Logged in.' });
    } catch (error) {
      next(error);
    }
  };

  const refresh = async (req, res, next) => {
    try {
      const { refreshToken, email } = req.body;
      const token = await authService.refresh(email, refreshToken);

      res.status(200).json({ data: { token }, message: 'Refresh token.' });
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    refresh,
  };
};

export default AuthController;
