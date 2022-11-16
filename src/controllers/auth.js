import AuthService from '../services/auth.js';

const AuthController = () => {
  const authService = AuthService();

  const login = async (req, res, next) => {
    try {
      const userData = req.body;
      const loginUser = await authService.login(userData);

      res.status(201).json({ data: loginUser, message: 'logged in' });
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
  };
};

export default AuthController;
