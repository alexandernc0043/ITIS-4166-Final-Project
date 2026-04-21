import { body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCreateReview = [
  body('bookId')
    .exists({ values: 'falsy' })
    .withMessage('bookId must be provided.')
    .isInt({ min: 1 })
    .withMessage('bookId must be a positive integer.'),
  body('rating')
    .exists({ values: 'falsy' })
    .withMessage('rating must be provided.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5.'),
  body('content')
    .exists({ values: 'falsy' })
    .withMessage('content must be provided.')
    .isString()
    .withMessage('Content must be a string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Content must be at least 3 characters.'),
  handleValidationErrors,
];
export const validateUpdateReview = [
  oneOf(
    [
      body('rating').exists({ values: 'falsy' }),
      body('content').exists({ values: 'falsy' }),
    ],
    {
      message: 'At least one of rating or content is required.',
    },
  ),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5.'),
  body('content')
    .optional()
    .isString()
    .withMessage('Content must be a string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Content must be at least 3 characters.'),
  handleValidationErrors,
];
