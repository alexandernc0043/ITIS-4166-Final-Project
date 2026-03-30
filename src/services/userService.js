import * as repo from '../repositories/userRepo.js';

export async function getUserById(id) {
  const user = await repo.getUserById(id);
  return user;
}
export async function updateUser(id, data) {
  const updatedUser = await repo.updateUser(id, data);
  return updatedUser;
}
export async function getAllUsers() {
  const users = await repo.getAllUsers();
  return users;
}
export async function updateUserRole(id, role) {
  const updatedUser = await repo.updateUserRole(id, role);
  return updatedUser;
}
export async function deleteUser(id) {
  await repo.deleteUser(id);
}
