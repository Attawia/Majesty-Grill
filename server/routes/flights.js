import express from 'express';

const router = express.Router();

import { searchAllFlights, searchFlights } from '../controllers/flights.js';

router.get('/', searchAllFlights);
router.post('/searchFlights', searchFlights);
router.post('/searchFlightsUser', searchFlightsUser);

export default router;