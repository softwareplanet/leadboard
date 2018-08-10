const mongoose = require("mongoose");

// Person
const contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    organization: {type: mongoose.Schema.Types.ObjectId, ref:'Organization'},
    custom: [{name: "string", value: "string"}],
    domain: {type: mongoose.Schema.Types.ObjectId, required: true},
    timestamp: {type: Date, default: Date.now}
});

contactSchema.statics.findOneOrCreate = (contactData) => {
    if (mongoose.Types.ObjectId.isValid(contactData.contact)) {
        return Contact.findById(contactData.contact);
    }

    let organization = contactData.organization ? {organization: mongoose.Types.ObjectId(contactData.organization)} : {};
    let contact = {
        _id: new mongoose.Types.ObjectId(),
        name: contactData.contact,
        domain: contactData.domain? mongoose.Types.ObjectId(contactData.domain):'',
        ...organization
    };

    return Contact.create(contact);

};

const Contact = mongoose.model("Contact", contactSchema);


module.exports = Contact;
