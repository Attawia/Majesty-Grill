import express from 'express';
import { sendCancelEmail } from '../controllers/email.js';

const router = express.Router();

router.get('/cancelResEmail', sendCancelEmail);

export default router;
