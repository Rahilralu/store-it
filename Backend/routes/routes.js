import express from 'express';
import { getUser,storeUser,getConfirmation } from '../controllers/storeit.js';

const router = express.Router();

router.post('/frontend/auth', storeUser);
router.get('/callback',getConfirmation);
router.get('/frontend/auth', getUser);

export default router;