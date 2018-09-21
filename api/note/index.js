import { Router } from "express";
import Note from "../../models/note";
import { isValidModelId, isBlank } from "../../validation/validationUtils";

const router = new Router();

const validateNoteDomain = (req, res, next) => {
  if (isValidModelId(req.params.noteId)) {
    Note.findById(req.params.noteId)
      .populate({ path: "lead", populate: { path: "owner" } })
      .then(note => {
        if (note !== null && note.lead.owner.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Note with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided note's id is not valid" } });
  }
};

const noteMembersMiddlewares = [validateNoteDomain];

// @route   GET api/note/
// @desc    Get notes by contact
// @access  Private
router.get("/:modelName/:modelId", noteMembersMiddlewares, (req, res) => {
  const { modelName, modelId } = req.params;
  findNotesByModel(modelName, modelId)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

const findNotesByModel = (model, noteId) => {
  switch (model) {
    case "lead":
      return Note.find({ lead: noteId });
    case "contact":
      return Note.find({ contact: noteId });
    case "organization":
      return Note.find({ organization: noteId });
    default:
      return Promise.reject(Error("Bad model's type"));
  }
};

// @route   PATCH api/note/:noteId
// @desc    Update note
// @access  Private
router.patch("/:noteId", noteMembersMiddlewares, async (req, res) => {
  if (!isBlank(req.body)) {
    Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { $set: { text: req.body.text, lastUpdater: req.user.id } },
      { new: true })
      .then(note => {
        return res.json(note);
      })
      .catch(error => {
        res.status(400).json({ errors: { message: error } });
      });
  } else {
    req.status(400).json({ errors: { message: "Note cant be empty" } });
  }
});

// @route   POST api/note
// @desc    Create note
// @access  Private
router.post("/", noteMembersMiddlewares, (req, res) => {
  if (!isBlank(req.body)) {
    Note.create(req.body)
      .then(lead => {
        res.json(lead);
      })
      .catch(error => {
        res.status(400).json({ errors: { message: error } });
      });
  } else {
    req.status(400).json({ errors: { message: "Note cant be empty" } });
  }
});

// @route   DELETE api/note/:noteId
// @desc    Delete note
// @access  Private
router.delete("/:noteId", noteMembersMiddlewares, (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(() => res.status(204).send())
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
