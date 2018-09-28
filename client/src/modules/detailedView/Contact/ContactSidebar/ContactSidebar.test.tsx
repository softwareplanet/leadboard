import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import Contact from '../../../../models/Contact';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';
import User from '../../../../models/User';
import { ContactSidebar } from './ContactSidebar';

describe('<ContactSidebar />', () => {
  const settings: DomainSettings = {
    customFields: [
      {
        _id: '5b97a9bb8ef7eb47231396ad',
        isAlwaysVisible: true,
        isDefault: true,
        isShownInAddDialog: false,
        model: 'Contact',
        name: 'Phone',
        type: 'string',
      },
    ],
    timezone: 'Etc/UTC',
  };

  const owner: User = {
    _id: '5b86a96eed17641891c5011c',
    domain: '5b7ea5997adb5755f6bbc02b',
    email: 'olegsamardak98@gmail.com',
    firstname: 'John',
    lastname: 'Smith',
    timestamp: new Date(),
  };

  const organization: Organization = {
    _id: '5b7c0c6e42b4cb4a2c72492d',
    custom: [{
      _id: '5b7ea6477adb5755f6bbc039',
      key: 'Address',
      value: '',
    }],
    domain: '5b6ab060f60c0524980fa23b',
    name: 'Company 1',
    owner,
    timestamp: new Date('2018-08-23T12:19:19.758Z'),
  };

  let contact: Contact = {
    _id: '',
    custom: [],
    domain: '',
    name: '',
    organization,
    owner,
    timestamp: new Date(),
  };

  const organizations: Organization[] = [organization, organization];

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow
    (
      <ContactSidebar
        settings={settings}
        contact={contact}
        loadOrganizations={noop}
        updateOrganization={noop}
        updateContact={noop}
        addCustomFieldToDomain={noop}
        organizations={organizations}
        editCustomFieldInDomain={noop}
        deleteCustomField={noop}
      />,
    );
  });

  it('render ContactSidebar component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('render correct EditCard quantity', () => {
    expect(wrapper.find('EditCard')).toHaveLength(2);
  });

  it('should render correct EmptyCard quantity', () => {
    contact = {
      ...contact,
      organization: undefined,
    };
    wrapper = shallow
    (
      <ContactSidebar
        settings={settings}
        contact={contact}
        loadOrganizations={noop}
        updateOrganization={noop}
        updateContact={noop}
        addCustomFieldToDomain={noop}
        organizations={organizations}
        editCustomFieldInDomain={noop}
        deleteCustomField={noop}
      />,
    );
    expect(wrapper.find('EmptyCard')).toHaveLength(1);
  });
});
