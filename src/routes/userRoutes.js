import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeRoles from '../middleware/authorizeRole.js';
import {
  validateId,
  validateRole,
  validateUpdateUser,
} from '../middleware/userValidators.js';

import * as controller from '../controllers/userController.js';

const router = express.Router();

// Get User (self)
// Errors
// 404 - Not Found
// 401 - Unauthorized
router.get('/me', authenticateUser, controller.getUserHandler);

// Update User (self)
// Errors
// 404 - Not Found
// 401 - Unauthorized
router.put(
  '/me',
  authenticateUser,
  validateUpdateUser,
  controller.updateUserHandler,
);

// Get Users (All) (Admin)
// Errors
// 401 - Unauthorized
// 403 - Forbidden (Not Admin)
router.get(
  '/',
  authenticateUser,
  authorizeRoles('ADMIN'),
  controller.getAllUsersHandler,
);

// Get Users (Single) (Admin)
// Errors
// 404 - Not Found
// 401 - Unauthorized
// 403 - Forbidden (Not Admin)
router.get(
  '/:id',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateId,
  controller.getUserByIdHandler,
);

// Update User Role (Admin)
// Errors
// 404 - Not Found
// 400 - Bad Request (Invalid Role)
// 401 - Unauthorized
// 403 - Forbidden (Not Admin)
router.patch(
  '/:id',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateId,
  validateRole,
  controller.updateUserRoleHandler,
);

export default router;
