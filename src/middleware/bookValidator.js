import { body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCreateBook = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name must be provided.')
    .isString()
    .withMessage('Name must be a string.')
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage('Name must be at least 4 characters.'),
  body('price')
    .exists({ values: 'falsy' })
    .withMessage('Price must be provided')

    .isFloat({ min: 1 })
    .withMessage('Price must be at least 1.00.'),
  body('authorId')
    .exists({ values: 'falsy' })
    .withMessage('AuthorId must be provided')

    .isInt({ min: 1 })
    .withMessage('Author Id must be a positive number'),

  body('published')
    .exists({ values: 'falsy' })
    .withMessage('Published must be provied')

    .isISO8601()
    .withMessage('Published must be in ISO8601 format'),
  handleValidationErrors,
];
export const validateUpdateBook = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('price').exists({ values: 'falsy' }),
      body('authorId').exists({ values: 'falsy' }),
      body('published').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one of name, price, authorId, or published is required.',
    },
  ),
  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string.')
    .isLength({ min: 4 })
    .withMessage('Name must be at least 4 characters.'),
  body('price')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('Price must be at least 1.00.'),
  body('authorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Author Id must be a positive number'),

  body('published')
    .optional()
    .isISO8601()
    .withMessage('Published must be in ISO8601 format'),
  handleValidationErrors,
];
