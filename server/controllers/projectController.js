import mongoose from 'mongoose';
import Project from '../models/Project.js';

/**
 * GET /api/projects
 * Returns all projects sorted by order ascending.
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/projects/:id
 * Accepts either a slug (string) or a MongoDB ObjectId.
 * Returns 404 with success:false if not found.
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    // Try slug first — if param is a valid ObjectId we still try slug first
    // so that a slug that looks like an ObjectId is handled correctly.
    project = await Project.findOne({ slug: id });

    if (!project && mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};
