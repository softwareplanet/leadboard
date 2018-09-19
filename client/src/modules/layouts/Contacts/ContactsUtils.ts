import ContactData from '../../../models/ContactData';
import OrganizationData from '../../../models/OrganizationData';

export const isContactsDataValid = (contacts: ContactData[] | OrganizationData[]) => {
  if (contacts.length > 0) {
    if (contacts[0].owner) {
      return true;
    }
  }
  return false;
};