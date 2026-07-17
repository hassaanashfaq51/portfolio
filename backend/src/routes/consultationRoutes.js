import express from 'express';
import { submitConsultation, getConsultations } from '../controllers/consultationController.js';

const router = express.Router();

router.post('/', submitConsultation);
router.get('/', getConsultations);

export default router;
