import express from 'express';
import { validateId } from '../middleware/userValidators.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeRoles from '../middleware/authorizeRole.js';
import * as handler from '../controllers/authorController.js';
import { validateAuthorName } from '../middleware/authorValidator.js';

const router = express.Router();
/**
 * Get Author By Id
 * Errors
 * 404 - Not Found
 */
router.get('/:id', validateId, handler.getAuthorByIdHandler); // get single
/**
 * Get All Authors
 * Errors
 * None
 */
router.get('/', handler.getAllAuthorsHandler);

router.get('/:id/books', validateId, handler.getAuthorBooksHandler);

/**
 * Create Author
 * Errors
 * 400 - Bad Author Name
 * 401 - Unauthorized
 * 403 - Not Admin
 */
router.post(
  '/',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateAuthorName,
  handler.createAuthorHandler,
);
/**
 * Update Author
 * Errors
 * 400 - Bad Author Name or Id
 *  * 404 - Not Found
 * 401 - Unauthorized
 * 403 - Not Admin
 */
router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateId,
  validateAuthorName,
  handler.updateAuthorHandler,
);
/**
 * Delete Author
 * Errors
 * 400 - Bad Id
 * 404 - Not Found
 * 401 - Unauthorized
 * 403 - Not Admin
 */
router.delete(
  '/:id',
  validateId,
  authenticateUser,
  authorizeRoles('ADMIN'),
  handler.deleteAuthorController,
);
export default router;
