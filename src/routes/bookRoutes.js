import * as handler from '../controllers/bookController.js';
import express from 'express';
import { validateId } from '../middleware/userValidators.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeRoles from '../middleware/authorizeRole.js';
import {
  validateCreateBook,
  validateUpdateBook,
} from '../middleware/bookValidator.js';

const router = express.Router();

router.get('/', handler.getAllBookHandler);
router.get('/:id', validateId, handler.getBookByIdHandler);
router.post(
  '/',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateCreateBook,
  handler.createBookHandler,
);
router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateId,
  validateUpdateBook,
  handler.updateBookHandler,
);
router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles('ADMIN'),
  validateId,
  handler.deleteBookHandler,
);
export default router;
