import UsersService from '../services/users.js';

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (_req, res, next) => {
    try {
      const findAllUsersData = await usersService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const findUserByEmail = async (req, res, next) => {
    try {
      const findUser = await usersService.findUserByEmail();

      res.status(200).json({ data: findUser, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const findUserData = await usersService.findUserById(userId);

      res.status(200).json({ data: findUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createUser = async (req, res, next) => {
    try {
      const userData = req.body;
      const createUserData = await usersService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updateUserData = await usersService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deleteUserData = await usersService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  return {
    createUser,
    deleteUser,
    findUserByEmail,
    getUserById,
    getUsers,
    updateUser,
  };
};

export default UsersController;
