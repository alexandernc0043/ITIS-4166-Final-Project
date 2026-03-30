import express from 'express';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
const router = express.Router();
/**
 * User Sign Up
 * Errors
 * 400 - Bad Data
 * 409 - Email Conflict
 */
router.post('/signup', validateSignUp, signUpHandler);
/**
 * User Login
 * Errors
 * 401 - Bad Token or Details
 * 400 - Bad Request
 */
router.post('/login', validateLogIn, logInHandler);
export default router;
