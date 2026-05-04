import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tech: [String],
    problem: String,
    solution: String,
    architecture: String,
    features: [String],
    challenges: [String],
    learnings: [String],
    status: {
      type: String,
      enum: ['completed', 'in-progress'],
      default: 'completed',
    },
    order: { type: Number, default: 0 },
    thumbnail: String,
    githubUrl: String,
    liveUrl: String,
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
