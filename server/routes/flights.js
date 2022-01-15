import express from 'express';


import { getCreate, createFlight,flightDelete,updateFlight, getUpdateFlight,searchAllFlights, searchFlights,reserveSeats,addReservation,searchFlightsUser, searchReturnFlightsUser, updateReservation , emptySeats  } from '../controllers/flights.js'


const router = express.Router();

router.get('/createFlight', getCreate);
router.post('/createFlight', createFlight);
router.patch('/updateflight',updateFlight);
router.post('/getupdateflight',getUpdateFlight);
router.delete('/:id', flightDelete)
router.get('/', searchAllFlights);
router.post('/searchFlights', searchFlights);
router.post('/searchFlightsUser', searchFlightsUser);
router.post('/searchReturnFlightsUser', searchReturnFlightsUser);
router.patch('/reserveseats',reserveSeats);
router.post('/addReservation/',addReservation);
router.patch('/updateSeat/',updateReservation);
router.patch('/emptySeats/',emptySeats);

export default router;

