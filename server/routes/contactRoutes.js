import { Router } from 'express';
import { createContact } from '../controllers/contactController.js';

const router = Router();

// POST /api/contact
router.post('/', createContact);

export default router;
