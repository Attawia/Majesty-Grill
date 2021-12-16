import express from 'express';
import {getAllReservations} from '../controllers/users.js'

const router = express.Router();

//router.get('/:id', getTheLastReservation);
router.get('/AllReservations/:id', getAllReservations);

export default router;
