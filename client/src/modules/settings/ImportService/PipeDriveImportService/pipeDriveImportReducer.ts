import Action from '../../../../models/Action';
import { GET_CONTACT_FIELDS, GET_CONTACTS_DATA, GET_ORGANIZATION_FIELDS, GET_ORGANIZATIONS_DATA } from './types';

export default function(state = [], action: Action) {
  const { payload } = action;
  switch (action.type) {
    case GET_ORGANIZATIONS_DATA:
      return { ...state, organizations: payload };
    case GET_CONTACTS_DATA:
      return { ...state, contacts: payload };
    case GET_CONTACT_FIELDS:
      return { ...state, contactFields: payload };
    case GET_ORGANIZATION_FIELDS:
      return { ...state, organizationFields: payload };
    default:
      return state;
  }
}
