import { Candidate } from "../models/candidate.js";
import { Note } from "../models/note.js";
// Get all candidates

export const getAllCandidates = async (
  req,
  res,
) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Get single candidate with notes
export const getCandidateById = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
      return;
    }

    const notes = await Note.find({ candidateId: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        candidate,
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Create a new candidate
export const createCandidate = async (
  req,
  res,
) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
      return;
    }

    const candidate = await Candidate.create({ name, role });

    res.status(201).json({
      success: true,
      data: candidate,
      message: "Candidate created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create candidate",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Bulk upload candidates from CSV
export const bulkUploadCandidates = async (
  req,
  res,
) => {
  try {
    const candidates = req.body;

    if (!Array.isArray(candidates) || candidates.length === 0) {
      res.status(400).json({
        success: false,
        message: "Invalid data format. Expected an array of candidates",
      });
      return;
    }

    // Validating each candidate has name and role
    const invalidCandidates = candidates.filter(
      (candidate) => !candidate.name || !candidate.role,
    );

    if (invalidCandidates.length > 0) {
      res.status(400).json({
        success: false,
        message: "All candidates must have name and role",
      });
      return;
    }

    // Inserting all candidates
    const createdCandidates = await Candidate.insertMany(candidates);

    res.status(201).json({
      success: true,
      data: createdCandidates,
      message: `Successfully uploaded ${createdCandidates.length} candidates`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload candidates",
      error: error ? error.message : "Unknown error",
    });
  }
};

// Delete candidate and related notes
export const deleteCandidate = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
      return;
    }
    
    // Deleting all notes associated to the candidate
    await Note.deleteMany({ candidateId: id });

    await Candidate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Candidate and related notes deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete candidate",
      error: error ? error.message : "Unknown error",
    });
  }
};
