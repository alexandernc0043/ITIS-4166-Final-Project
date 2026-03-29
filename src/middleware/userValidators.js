import { handleValidationErrors } from './handleValidationErrors.js';
import { body, param, oneOf } from 'express-validator';
const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
export const validateSignUp = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogIn = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];
export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),
  handleValidationErrors,
];
export const validateRole = [
  body('role').trim().escape().isString().isIn(['USER', 'ADMIN']),
];
export const validateUpdateUser = [
  oneOf([
    body('email').exists({ values: 'falsy' }),
    body('password').exists({ values: 'falsy' }),
  ]),
  body('email')
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be valid, EX: example@example.com')
    .bail(),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    )
    .bail(),
  handleValidationErrors,
];
