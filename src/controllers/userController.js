import * as service from '../services/userService.js';
import bcrypt from 'bcrypt';

export async function getUserHandler(req, res) {
  const { id } = req.user;
  const user = await service.getUserById(id);
  res.status(200).json(user);
}
export async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  const user = await service.getUserById(id);
  res.status(200).json(user);
}
export async function updateUserHandler(req, res) {
  const { id } = req.user;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const { email, password } = req.body;
  const updatedUser = await service.updateUser(id, { email, password });
  res.status(200).json(updatedUser);
}
export async function getAllUsersHandler(req, res) {
  const users = await service.getAllUsers();
  res.status(200).json(users);
}
export async function updateUserRoleHandler(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  const updatedUser = await service.updateUserRole(id, role);
  res.status(200).json(updatedUser);
}
export async function deleteUserHandler(req, res) {
  const { id } = req.params;
  await service.deleteUser(id);
  res.status(204);
}
