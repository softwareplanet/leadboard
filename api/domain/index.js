import { Router } from "express";
import { validateDomainSettingsUpdate } from "../../validation/domain";
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

// @route   PATCH api/domain/:domainId/settings
// @desc    Change domain settings
// @access  Private
router.post("/", domainMembersMiddlewares, (req, res) => {
  const { hasErrors, errors } = validateDomainSettingsUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Domain.findByIdAndUpdate(req.params.domainId, { $set: req.body }, { new: true })
    .then(domain => res.json(domain))
    .catch(error => res.status(400).json({ errors: { message: error } }));
});

export default router;
