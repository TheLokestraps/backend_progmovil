import bcrypt from 'bcrypt';

import HttpException from '../exceptions/HttpException.js';
import db from '../../firebase.config.js';

const USER_COLLECTION = 'users';

const UserService = () => {
  const usersRef = db.collection(USER_COLLECTION);

  const findAllUser = async () => {
    const queryUsers = await usersRef.get();
    const users = queryUsers.docs.map((user) => ({ id: user.id, ...user.data() }));

    return users;
  };

  const findUserById = async (userId)=> {
    if (!userId) throw new HttpException(400, "You're not userId");

    const findUser = await usersRef.doc(userId).get();
    if (!findUser.exists) throw new HttpException(409, "You're not user");

    return { id: findUser.id, ...findUser.data() };
  };

  const createUser = async (userData) => {
    if (!userData) throw new HttpException(400, 'User data not available.');
    
    const findUser = await usersRef.where("email", "==", userData.email).get();
    if (!findUser.empty) throw new HttpException(409, `You're email ${userData.email} already exists`);
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData = await (await usersRef.add({ ...userData, password: hashedPassword })).get();

    return { id: createUserData.id, ...createUserData.data() };
  };

  // const updateUser = async (userId: string, userData: CreateUserDto): Promise<User> => {
  //   if (isEmpty(userData)) throw new HttpException(400, 'You're not userData');
  //   const copyUser = { ...userData };

  //   if (copyUser.email) {
  //     const findUser: User = await UserModel.findOne({ email: userData.email });
  //     // eslint-disable-next-line no-underscore-dangle
  //     if (findUser && findUser._id !== userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  //   }

  //   if (copyUser.password) {
  //     const hashedPassword = await bcrypt.hash(userData.password, 10);
  //     copyUser.password = hashedPassword;
  //   }

  //   const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { copyUser });
  //   if (!updateUserById) throw new HttpException(409, 'You're not user');

  //   return updateUserById;
  // };

  // const deleteUser = async (userId: string): Promise<User> => {
  //   const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, 'You're not user');

  //   return deleteUserById;
  // };

  return {
    createUser,
    // deleteUser,
    findAllUser,
    findUserById,
    // updateUser,
  };
};

export default UserService;
