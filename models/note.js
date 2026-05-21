import mongoose, { Document, Schema } from 'mongoose';


const noteSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
      required: [true, 'Candidate ID is required'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
noteSchema.index({ candidateId: 1, createdAt: -1 });

export const Note = mongoose.model('Note', noteSchema);