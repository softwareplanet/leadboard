import { Router } from "express";
import {
  validateCustomFieldCreation,
  validateCustomFieldUpdate,
  validateDomainSettingsUpdate,
} from "../../validation/domain";
import { isValidModelId } from "../../validation/validationUtils";
import Domain from "../../models/domain";

const router = new Router();

const validateDomain = (req, res, next) => {
  if (isValidModelId(req.params.domainId)) {
    Domain.findById(req.params.domainId)
      .then(domain => {
        if (domain !== null) {
          if (domain._id.equals(req.user.domain)) {
            next();
          } else {
            return res.status(403).json({
              errors: {
                message: "You don't have necessary rights to access this domain",
              },
            });
          }
        } else {
          return res.status(404).json({
            errors: {
              message: "Domain with provided id is not found",
            },
          });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided domain id is not valid" } });
  }
};

const domainMembersMiddlewares = [validateDomain];

// @route   POST api/domain/:domainId/settings/customFields
// @desc    Add custom field
// @access  Private
router.post("/:domainId/settings/customFields", domainMembersMiddlewares, (req, res) => {
  const { hasErrors, errors } = validateCustomFieldCreation(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Domain.findByIdAndUpdate(req.params.domainId,
    { $push: { settings: { customFields: req.body } } },
    { new: true })
    .then(domain => res.json(domain))
    .catch(error => res.status(400).json({ errors: { message: error } }));
});


// @route   PATCH api/domain/:domainId/settings/customFields/:customFieldId
// @desc    Update custom field
// @access  Private
router.patch("/:domainId/settings/customFields/:customFieldId", domainMembersMiddlewares, (req, res) => {
  const { hasErrors, errors } = validateCustomFieldUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Domain.findByIdAndUpdate(req.params.domainId,
    { $set: { settings: { customFields: req.body } } },
    { new: true })
    .then(domain => res.json(domain))
    .catch(error => res.status(400).json({ errors: { message: error } }));
});


// @route   DELETE api/domain/:domainId/settings/customFields/:customFieldId
// @desc    Delete custom field
// @access  Private
router.delete("/:domainId/settings/customFields/:customFieldId", domainMembersMiddlewares, (req, res) => {
  Domain.findByIdAndUpdate(req.params.domainId,
    { $pull: { settings: { customFields: req.body } } },
    { new: true })
    .then(domain => res.json(domain))
    .catch(error => res.status(400).json({ errors: { message: error } }));
});


router.patch("/:domainId/settings", domainMembersMiddlewares, (req, res) => {
  const { hasErrors, errors } = validateDomainSettingsUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Domain.findByIdAndUpdate(req.params.domainId, { $set: { settings: req.body } }, { new: true })
    .then(domain => res.json(domain))
    .catch(error => res.status(400).json({ errors: { message: error } }));
});

export default router;
