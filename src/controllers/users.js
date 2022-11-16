import UserService from '../services/users.js';

const UsersController = () => {
  const userService = UserService();

  const getUsers = async (_req, res, next) => {
    try {
      const findAllUsersData = await userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const findUserData = await userService.findUserById(userId);

      res.status(200).json({ data: findUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createUser = async (req, res, next) => {
    try {
      const userData = req.body;
      const createUserData = await userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  
  // const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = req.params.id;
  //     const userData: CreateUserDto = req.body;
  //     const updateUserData: User = await userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = req.params.id;
  //     const deleteUserData: User = await userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  const loginUser = async (req, res, next) => {
    try {
      const userData = req.body;

      const loginUser = await userService.loginUser(userData);

      res.status(201).json({ data: loginUser, message: 'created' });
    
    } catch (error) {
      next(error);
    }
  }


  return {
    createUser,
    getUserById,
    getUsers,
    // updateUser,
    // deleteUser,
    loginUser,
  };
};

export default UsersController;
