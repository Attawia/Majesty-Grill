import express from 'express';
import {getAllReservations, getTheLastReservation, cancelReservation, getUserEmail} from '../controllers/users.js'

const router = express.Router();

//router.get('/:id', getTheLastReservation);
router.get('/AllReservations/:user', getAllReservations);
router.get('/SummaryReservation/:user', getTheLastReservation);
router.delete('/cancelRes/:id', cancelReservation);
router.get('/getEmail/:user', getUserEmail);


export default router;
