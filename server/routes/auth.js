import express from 'express';
import { authorize,isGuest,getUser,validatePassword,validateID} from '../controllers/auth.js';

const router = express.Router();

router.post('/', authorize);
router.post('/isGuest',isGuest);
router.post('/getUser',getUser);
router.post('/validatePassword',validatePassword);
router.post('/validateID',validateID);

export default router;