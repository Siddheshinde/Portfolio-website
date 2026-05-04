import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  period: { type: String, required: true },
  type: {
    type: String,
    enum: ['leadership', 'academic', 'creative', 'technical'],
    required: true,
  },
  description: { type: String, required: true },
  impact: [String],
  order: Number,
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
