import { Router } from "express";
import Note from "../../models/note";
import {
  validateNotesGet,
  validateNoteDomainMiddleware,
  validateNoteUpdate,
  validateNoteCreate,
} from "../../validation/note";

const router = new Router();

// @route   GET api/note/
// @desc    Get notes by contact
// @access  Private
router.get("/:modelName/:modelId", (req, res) => {
  const { modelName, modelId } = req.params;
  const { hasErrors, errors } = validateNotesGet(modelName);
  if (hasErrors) return res.status(400).json({ errors });
  findNotesByModel(modelName, modelId)
    .populate(Note.populates.basic)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

const findNotesByModel = (model, modelId) => {
  switch (model) {
    case "lead":
      return Note.find({ lead: modelId });
    case "contact":
      return Note.find({ contact: modelId });
    case "organization":
      return Note.find({ organization: modelId });
  }
};

// @route   PATCH api/note/:noteId
// @desc    Update note
// @access  Private
router.patch("/:noteId", validateNoteDomainMiddleware, async (req, res) => {
  const { noteId } = req.params;
  const { text } = req.body;
  const { hasErrors, errors } = validateNoteUpdate(noteId, text);
  if (hasErrors) return res.status(400).json({ errors });
  Note.findOneAndUpdate(
    { _id: noteId },
    { $set: { text: text, lastUpdater: req.user.id } },
    { new: true })
    .then(note => {
      Note.populate(note, Note.populates.basic, (err,note) => {
        res.json(note);
      });
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
  Note.create(note)
    .then(note => {
      Note.populate(note, Note.populates.basic, (err,note) => {
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
    .then(() => res.status(204).send())
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
