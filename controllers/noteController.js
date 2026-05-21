import { Note } from "../models/note.js";
import { Candidate } from "../models/candidate.js";

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("candidateId")
      .sort({ createdAt: -1 });

      res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Get notes for a specific candidate
export const getNotesByCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const notes = await Note.find({ candidateId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { candidateId, content } = req.body;

    if (!candidateId || !content) {
      res.status(400).json({
        success: false,
        message: "Candidate ID and content are required",
      });
      return;
    }

    // Verify candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
      return;
    }

    const note = await Note.create({ candidateId, content });

    res.status(201).json({
      success: true,
      data: note,
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error ? error.message : "Unknown error",
    });
  }
};
