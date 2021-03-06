import express from 'express';



import { getCreate, createFlight,flightDelete,updateFlight, getUpdateFlight,searchAllFlights, searchFlights,reserveSeats,addReservation,searchFlightsUser, searchReturnFlightsUser, updateReservation , emptySeats , emptySeats2 ,editReservationDep, changeSeats } from '../controllers/flights.js'


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
router.post('/editReservationDep/',editReservationDep);
router.patch('/updateSeat/',updateReservation);
router.patch('/emptySeats/',emptySeats);
router.patch('/emptySeats2/',emptySeats2);
router.patch('/changeseats',changeSeats);

export default router;

