import express from 'express';
import * as handler from '../controllers/reviewController.js';
import { validateId } from '../middleware/userValidators.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeRoles from '../middleware/authorizeRole.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';
const router = express.Router();
/**
 * Get All Reviews
 * Errors
 */
router.get('/', handler.getAllReviewHandler);
/**
 * Get Review by Id
 * Errors
 * 404 - Not Found
 * 400 - Bad Id
 */
router.get('/:id', validateId, handler.getReviewByIdHandler);
/**
 * Create Review
 * Errors
 * 400 - Bad Id or Data
 * Rating must be between 1-5, content 3+
 * 401 - Unauthorized
 */
router.post('/', authenticateUser, handler.createReviewHandler); // TODO: VALIDATE THIS
/**
 * Update Review
 * Errors
 * 400 - Bad Id or Data
 * Rating must be between 1-5, content 3+
 * 401 - Unauthorized
 * 403 - Doesn't own
 */
router.put(
  '/:id',
  authenticateUser,
  authorizeOwnership,
  handler.updateReviewHandler,
);
router.delete(
  '/:id',
  authenticateUser,
  authorizeOwnership,
  handler.deleteReviewHandler,
);
export default router;
