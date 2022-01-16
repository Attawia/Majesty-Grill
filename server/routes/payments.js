import express from 'express';
import { makePayment } from '../controllers/payments.js';

const router = express.Router();


router.post('/makePayment', makePayment);


export default router;
