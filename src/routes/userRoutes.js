import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeRoles from '../middleware/authorizeRole.js';
import {
  validateId,
  validateRole,
  validateUpdateUser,
} from '../middleware/userValidators.js';

import * as handler from '../controllers/userController.js';

const router = express.Router();

/**
 * Get User (Self)
 * Errors
 * 404 - Not Found
 * 401 - Unauthorized
 */
router.get('/me', authenticateUser, handler.getUserHandler);

// Update User (self)
// Errors
// 404 - Not Found
// 401 - Unauthorized
router.put(
  '/me',
  authenticateUser,
  validateUpdateUser,
  handler.updateUserHandler,
);

// Get Users (All) (Admin)
// Errors
// 401 - Unauthorized
// 403 - Forbidden (Not Admin)
router.get(
  '/',
  authenticateUser,
  authorizeRoles('ADMIN'),
  handler.getAllUsersHandler,
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
  handler.getUserByIdHandler,
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
  handler.updateUserRoleHandler,
);

export default router;
