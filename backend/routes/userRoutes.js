import express from 'express';
import { registerUser, authUser, checkPhoneExists } from '../controllers/userController.js';
import { getMe } from '../controllers/profileController.js';
import { userProtect } from '../middleware/userProtect.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/check-phone', checkPhoneExists);
router.get('/me', userProtect, getMe);

export default router;
