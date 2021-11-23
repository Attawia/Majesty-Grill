import express from 'express';
import {flightDelete} from '../controllers/flights.js';

const router = express.Router();


 router.delete('/:id', flightDelete)

 export default router;