import prisma from '../config/db.js';

function handlePrismaError(error) {
  switch (error.code) {
    case 'P2025': {
      const userNotFoundError = new Error('User not found');
      userNotFoundError.status = 404;
      throw userNotFoundError;
    }
    case 'P2002': {
      const emailConflictError = new Error('Email has already been used');
      emailConflictError.status = 409; // Conflict
      throw emailConflictError;
    }
    default: {
      throw error;
    }
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
    const foundUser = await prisma.user.findUniqueOrThrow({
      where: { id },
      omit: { password: true },
    });
    return foundUser;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getUserByEmail(email) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });
    return foundUser;
  } catch (error) {
    handlePrismaError(error);
  }
}
export async function getAllUsers() {
  const users = await prisma.user.findMany({ omit: { password: true } });
  return users;
}

/**
 * Updates a user in the database
 */
export async function updateUser(id, data) {
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
export async function updateUserRole(id, role) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role,
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
export async function deleteUser(id) {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    handlePrismaError(error);
  }
}
