import express from 'express';
import { authorize} from '../controllers/auth.js';

const router = express.Router();

router.post('/', authorize);

export default router;