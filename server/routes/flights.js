import express from 'express';
import {flightDelete,updateFlight, getUpdateFlight} from '../controllers/flights.js';

const router = express.Router();

router.patch('/updateflight',updateFlight);
router.post('/getupdateflight',getUpdateFlight);
router.delete('/:id', flightDelete)

 export default router;

