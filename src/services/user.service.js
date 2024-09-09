import { UserModel } from "../database/postgres.js";
const findUserByEmail = async (email) => {
  return await UserModel.scope("withPassword").findOne({
    where: {
      email: email,
    },
  });
};

const userCreate = async (body) => {
  const { firstName, lastName, email, password, isVerified } = body;
  return await UserModel.create({
    firstName,
    lastName,
    email,
    password,
    isVerified,
  });
};

const findUserById = async (id) => {
  return await UserModel.findByPk(id);
};
const updateUser = async (id, updateData) => {
  return await UserModel.update(updateData, {
    where: { _id: id },
  });
};

const updateUserByPassword = async (email, password) => {
  const hashedPassword = await password;
  return await UserModel.update(
    { password: hashedPassword },
    {
      where: {
        email: email,
      },
    }
  );
};

// Delete user
const deleteUser = async (id) => {
  return await UserModel.destroy({
    where: { _id: id },
  });
};

const findAllUsers = async () => {
  return await UserModel.findAll({});
};

// Update a user by ID

export {
  findUserByEmail,
  userCreate,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
  updateUserByPassword,
};
