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
    if (!userId) throw new HttpException(400, "UserId nor available.");

    const findUser = await usersRef.doc(userId).get();
    if (!findUser.exists) throw new HttpException(409, "You're not user.");

    return { id: findUser.id, ...findUser.data() };
  };

  const createUser = async (userData) => {
    if (!userData) throw new HttpException(400, 'User data not available.');
    
    const findUser = await usersRef.where("email", "==", userData.email).get();
    if (!findUser.empty) throw new HttpException(409, `You're email ${userData.email} already exists.`);
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData = await (await usersRef.add({ ...userData, password: hashedPassword })).get();

    return { id: createUserData.id, ...createUserData.data() };
  };

  const updateUser = async (userId, userData) => {
    if (!userData) throw new HttpException(400, 'User data not available.');
    const copyUser = { ...userData };

    if (userData.email) {
      const findUser = await usersRef.where('email', '==', userData.email).get();
      if (findUser.empty) throw new HttpException(409, `You're email ${userData.email} doesn't exists.`);
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      copyUser.password = hashedPassword;
    }

    const updateUserById = await usersRef.doc(userId).update({ ...copyUser });
    if (!updateUserById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedUser = await usersRef.doc(userId).get();

    return { id: updatedUser.id, ...updatedUser.data() };
  };

  const deleteUser = async (userId) => {
    const deleteUserById = await usersRef.doc(userId).delete();
    if (!deleteUserById) throw new HttpException(409, 'Delete not available now, try later.');

    return deleteUserById;
  };

  return {
    createUser,
    deleteUser,
    findAllUser,
    findUserById,
    updateUser,
  };
};

export default UserService;
