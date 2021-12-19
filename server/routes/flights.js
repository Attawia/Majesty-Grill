import express from 'express';

import { getCreate, createFlight,flightDelete,updateFlight, getUpdateFlight,searchAllFlights, searchFlights,reserveSeats,addReservation } from '../controllers/flights.js'

const router = express.Router();

router.get('/createFlight', getCreate);
router.post('/createFlight', createFlight);
router.patch('/updateflight',updateFlight);
router.post('/getupdateflight',getUpdateFlight);
router.delete('/:id', flightDelete)
router.get('/', searchAllFlights);
router.post('/searchFlights', searchFlights);
router.patch('/reserveseats',reserveSeats);
router.post('/addReservation/',addReservation);

export default router;

