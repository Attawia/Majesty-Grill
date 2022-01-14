import express from 'express';
import {register, signIn, updateUser,getUpdateUser } from '../controllers/index.js'

const router = express.Router();

router.post("/",signIn);
router.post("/register",register);
router.patch('/updateUser',updateUser);
router.post('/getUpdateUser',getUpdateUser);

export default router;