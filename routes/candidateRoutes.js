import express from "express";
import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  bulkUploadCandidates,
  deleteCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.post("/", createCandidate);
router.post("/bulk-upload", bulkUploadCandidates);
router.delete("/:id", deleteCandidate);

export default router;
