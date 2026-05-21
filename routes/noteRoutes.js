import express from "express";
import {
  getAllNotes,
  getNotesByCandidate,
  createNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/candidate/:candidateId", getNotesByCandidate);
router.post("/", createNote);
router.delete("/:id", deleteNote);

export default router;
