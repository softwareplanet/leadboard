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

  if (contactData.contact && mongoose.Types.ObjectId.isValid(contactData.contact)) {
    return Contact.findById(contactData.contact).then(contact => {
      if (contact === null) {
        return Contact.create(newContact)
      }
    })
  }

  return Contact.create(newContact);
};

const Contact = mongoose.model("Contact", contactSchema);


module.exports = Contact;
