import express from 'express';
import {register, signIn} from '../controllers/index.js'

const router = express.Router();

router.post("/",signIn);
router.post("/register",register);

export default router;