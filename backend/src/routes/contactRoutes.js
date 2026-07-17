import express from 'express';
import { submitMessage, getMessages } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitMessage);
router.get('/', getMessages);

export default router;
