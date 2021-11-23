import express from 'express';
import {updateFlight, getUpdateFlight} from '../controllers/flights.js';
import Flight from '../models/Flight.js'; 

const router = express.Router();
router.patch('/updateflight',updateFlight);
router.post('/getupdateflight',getUpdateFlight);

export default router;