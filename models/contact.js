import mongoose from "mongoose";

// Person
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  custom: [{ name: "string", value: "string" }],
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now }
});

contactSchema.statics.findOneOrCreate = (contactData) => {
  let organization = contactData.organization ? { organization: mongoose.Types.ObjectId(contactData.organization) } : {};
  let contactName = contactData.contact ? { name: contactData.contact } : {};
  let newContact = {
    _id: new mongoose.Types.ObjectId(),
    ...contactName,
    domain: contactData.domain ? mongoose.Types.ObjectId(contactData.domain) : '',
    ...organization
  };
  if (contactData.contact && mongoose.Types.ObjectId.isValid(contactData.contact))
    return Contact.findById(contactData.contact);
  return Contact.create(newContact);
};

//custom fields
const DEFAULT_CUSTOM_FIELDS = [{ name: "Phone", value: "" }, { name: "Email", value: "" }];

contactSchema.pre("save", function (next) {
  if (this.isNew) {
    if (this.custom.length === 0) {
      this.custom = DEFAULT_CUSTOM_FIELDS;
    }
  }
  next();
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
