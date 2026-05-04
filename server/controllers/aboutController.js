import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';

/**
 * Groups a flat array of skill documents into an object keyed by category.
 * Each key maps to an array of { name, level, order } objects.
 */
const groupSkillsByCategory = (skills) => {
  return skills.reduce((acc, skill) => {
    const { category, name, level, order } = skill;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ name, level, order });
    return acc;
  }, {});
};

/**
 * GET /api/about/skills
 * Returns skills grouped by category.
 */
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    const grouped = groupSkillsByCategory(skills);
    res.json({ success: true, data: grouped });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/about/experience
 * Returns all experience entries sorted by order ascending.
 */
export const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data: experience });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/about
 * Returns both skills (grouped by category) and experience in a single response.
 */
export const getAboutData = async (req, res, next) => {
  try {
    const [skillDocs, experience] = await Promise.all([
      Skill.find().sort({ category: 1, order: 1 }),
      Experience.find().sort({ order: 1 }),
    ]);

    const skills = groupSkillsByCategory(skillDocs);

    res.json({ success: true, data: { skills, experience } });
  } catch (err) {
    next(err);
  }
};
