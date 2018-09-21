import AggregatedContact from '../../../models/AggregatedContact';
import AggregatedOrganization from '../../../models/AggregatedOrganization';

export const isContactsDataValid = (contacts: AggregatedContact[] | AggregatedOrganization[]) => {
  if (contacts.length > 0) {
    if (contacts[0].owner) {
      return true;
    }
  }
  return false;
};
