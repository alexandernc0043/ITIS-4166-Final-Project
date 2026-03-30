import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
export const validateAuthorName = [
  body('name')
    .exists({ values: 'falsy' })
    .bail()
    .withMessage('Name must be provided')
    .trim()
    .escape()
    .isLength({ min: 4 }),
  handleValidationErrors,
];
