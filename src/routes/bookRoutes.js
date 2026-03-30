import * as handler from '../controllers/bookController.js';
import express from 'express';
import { validateId } from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', handler.getAllBookHandler);
router.get('/:id', validateId, handler.getBookByIdHandler);
router.post('/', handler.createBookHandler);
router.put('/:id', validateId, handler.updateBookHandler);
router.delete('/:id', validateId, handler.deleteBookHandler);
