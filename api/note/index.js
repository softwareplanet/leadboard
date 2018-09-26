import { Router } from "express";
import Note from "../../models/note";
import {
  validateNoteDomainMiddleware,
  validateNoteUpdate,
  validateNoteCreate,
} from "../../validation/note";

const router = new Router();

// @route   GET api/note/?model=modelId
// @desc    Get notes by model
// @access  Private
router.get("/", (req, res) => {
  Note.query(req.query)
    .then(notes => {
      Note.populate(notes, Note.populates.basic)
        .then(note => {
          res.json(note);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// @route   PATCH api/note/:modelId/:noteId
// @desc    Update note
// @access  Private
router.patch("/:modelId/:noteId", validateNoteDomainMiddleware, async (req, res) => {
  const { noteId } = req.params;
  const { text } = req.body;
  const { hasErrors, errors } = validateNoteUpdate(noteId, text);
  if (hasErrors) return res.status(400).json({ errors });
  Note.findOneAndUpdate(
    { _id: noteId },
    { $set: { text: text, lastUpdater: req.user.id } },
    { new: true })
    .populate(Note.populates.basic)
    .then(note => {
      res.json(note);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/note
// @desc    Create note
// @access  Private
router.post("/", (req, res) => {
  const note = req.body;
  const { hasErrors, errors } = validateNoteCreate(note.text);
  if (hasErrors) return res.status(400).json({ errors });
  note.user = req.user.id;
  note.domain = req.user.domain;
  Note.create(note)
    .then(note => {
      Note.populate(note, Note.populates.basic)
        .then(note => {
          res.json(note);
        });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   DELETE api/note/:noteId
// @desc    Delete note
// @access  Private
router.delete("/:noteId", validateNoteDomainMiddleware, (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(() => res.sendStatus(204))
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
