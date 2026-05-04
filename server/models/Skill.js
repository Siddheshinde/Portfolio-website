import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['languages', 'backend', 'ml', 'frontend', 'databases', 'tools'],
  },
  name: { type: String, required: true, trim: true },
  level: { type: Number, min: 0, max: 100 },
  order: Number,
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
