import { Router } from 'express';
import { getAllProjects, getProjectById } from '../controllers/projectController.js';

const router = Router();

// GET /api/projects
router.get('/', getAllProjects);

// GET /api/projects/:id  — accepts slug or MongoDB ObjectId
router.get('/:id', getProjectById);

export default router;
