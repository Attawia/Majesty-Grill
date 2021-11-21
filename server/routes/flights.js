import express from 'express';
import { getCreate, createFlight } from '../controllers/flights.js'

const router = express.Router();

router.get('/createFlight', getCreate);
router.post('/createFlight', createFlight);


export default router;
