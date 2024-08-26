import express from 'express';

import AuthController from '../controllers/auth';
import { isAuthenticated, isUnauthenticated } from '../middlewares/auth';

const router = express.Router();

router.route('/login').post(isUnauthenticated, AuthController.login);
router.route('/register').post(isUnauthenticated, AuthController.register);
router.route('/logout').post(isAuthenticated, AuthController.logout);
router.route('/authenticated').get(AuthController.authenticated);

export default router;