import prisma from '../config/db.js';

function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025':
      const userNotFoundError = new Error('User not found');
      userNotFoundError.status = 404;
      throw userNotFoundError;
    case 'P2002':
      const emailConflictError = new Error('Email has already been used');
      emailConflictError.status = 409; // Conflict
      throw emailConflictError;
    default:
      console.log(error.code);
      throw error;
  }
}

export async function createUser(data) {
  try {
    const createdUser = await prisma.user.create({
      data: data,
      omit: { password: true }, // don't include password in returned data
    });
    return createdUser;
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function getUserById(id) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    return foundUser;
  } catch (error) {
    handlePrismaError(error.code);
  }
}
export async function getUserByEmail(email) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });
    return foundUser;
  } catch (error) {
    handlePrismaError(error.code);
  }
}
async function getAllUsers() {
  const users = await prisma.user.findMany({ omit: { password: true } });
  return users;
}

/**
 * Updates a user in the database
 * @param {string name, string email, string password, string? role } data
 */
export async function updateUser(data) {
  const { id } = data;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function updateUserRole(data) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
        role: data.role,
      },
      omit: {
        password: true,
      },
    });
    return updatedUser;
  } catch (error) {
    handlePrismaError(error);
  }
}
