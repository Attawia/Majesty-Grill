import express from 'express';
import { sendCancelEmail } from '../controllers/email.js';

const router = express.Router();

router.post('/cancelResEmail', sendCancelEmail);

export default router;
