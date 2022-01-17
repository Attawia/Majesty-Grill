import express from 'express';
import { sendCancelEmail, sendItineraryEmail } from '../controllers/email.js';

const router = express.Router();


router.post('/cancelResEmail', sendCancelEmail);
router.post('/itineraryEmail', sendItineraryEmail);

export default router;
