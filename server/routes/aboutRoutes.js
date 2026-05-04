import { Router } from 'express';
import { getAboutData, getSkills, getExperience } from '../controllers/aboutController.js';

const router = Router();

// GET /api/about  — combined skills + experience
router.get('/', getAboutData);

// GET /api/about/skills
router.get('/skills', getSkills);

// GET /api/about/experience
router.get('/experience', getExperience);

export default router;
