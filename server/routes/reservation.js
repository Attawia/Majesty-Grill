import express from 'express';
import { updateReservation } from '../controllers/reservation.js';

const router = express.Router();

router.patch('/updateReservation',updateReservation);

export default router;