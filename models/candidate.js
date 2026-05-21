import mongoose, { Document, Schema } from 'mongoose';

const candidateSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Candidate name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model('Candidate', candidateSchema);