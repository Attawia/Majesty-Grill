import express from 'express';

import {updateUser, getUpdateUser, getUserById,changePassword} from '../controllers/users.js'

const router = express.Router();


router.patch('/updateUser',updateUser);
router.post('/getupdateuser',getUpdateUser);
router.get('/:id',getUserById);
router.post('/changePassword',changePassword);


export default router;