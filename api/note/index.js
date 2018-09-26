import { Router } from "express";
import Note from "../../models/note";
import {
  validateNoteUpdate,
  validateNoteCreate,
  validateContactDomainMiddleware,
  validateOrganizationDomainMiddleware,
  validateLeadDomainMiddleware,
} from "../../validation/note";
import { isValidModelId } from "../../validation/validationUtils";

const router = new Router();

// @route   GET api/note/?model=modelId
// @desc    Get notes by model
// @access  Private
router.get("/", (req, res) => {
  req.query.domain = req.user.domain;
  Note.query(req.query)
    .then(notes => {
      Note.populate(notes, Note.populates.basic)
        .then(notes => {
          res.json(notes);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

export const validateNoteDomainMiddleware = (req, res, next) => {
  if (isValidModelId(req.params.noteId)) {
    Note.findById(req.params.noteId)
      .then(note => {
        if (note !== null && note.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Note with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided note's id is not valid" } });
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
    .populate(Note.populates.basic)
    .then(note => {
      res.json(note);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

const createNoteMembersMiddlewares = [validateContactDomainMiddleware,validateLeadDomainMiddleware,validateOrganizationDomainMiddleware];

// @route   POST api/note
// @desc    Create note
// @access  Private
router.post("/", createNoteMembersMiddlewares, (req, res) => {
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
