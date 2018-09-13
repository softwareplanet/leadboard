import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import { IN_PROGRESS } from '../../../../constants';
import Contact from '../../../../models/Contact';
import Domain from '../../../../models/Domain';
import DomainSettings from '../../../../models/DomainSettings';
import Lead from '../../../../models/Lead';
import Organization from '../../../../models/Organization';
import { EditLeadSidebar } from './EditLeadSidebar';

describe('<EditLeadSidebar />', () => {

  const domain: Domain = {
    _id: '5b86a96eed17641891c5011b',
    name: 'interLink',
    settings: {
      customFields: [],
      timezone: 'UTC',
    },
    timestamp: new Date('2018-08-29T14:10:54.395Z'),
  };

  let editLead: Lead = {
    _id: '5b9110616ec37621e6b17bc4',
    contact: {
      _id: '5b9110616ec37621e6b17bc5',
      custom: [],
      domain,
      name: 'Sarah',
      timestamp: new Date('2018-09-06T11:32:49.518Z'),
    },
    custom: [],
    name: 'Sarah lead',
    notes: [],
    order: 1,
    organization: {
      _id: '5b7ea6477adb5755f6bbc038',
      custom: [{
        _id: '5b7ea6477adb5755f6bbc039',
        key: 'Address',
        value: '',
      }],
      domain: '5b7ea5997adb5755f6bbc02b',
      name: 'Microsoft ',
      timestamp: new Date('2018-08-23T12:19:19.758Z'),

    },
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain,
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
    stage: {
      _id: '5b86a96eed17641891c50120',
      funnel: '5b86a96eed17641891c5011d',
      name: 'Decision',
      order: 3,
      timestamp: new Date('2018-08-29T14:10:54.395Z'),
    },
    status: IN_PROGRESS,
    timestamp: new Date('2018-09-06T11:32:49.547Z'),
  };

  const organizations: Organization[] = [
    {
      _id: '5b7c0c6e42b4cb4a2c72492d',
      custom: [{
        _id: '5b7ea6477adb5755f6bbc039',
        key: 'Address',
        value: '',
      }],
      domain: '5b6ab060f60c0524980fa23b',
      name: 'Company 1',
      timestamp: new Date('2018-08-23T12:19:19.758Z'),
    },
    {
      _id: '5b7c0cc542b4cb4a2c724933',
      custom: [{
        _id: '5b7ea6477adb5755f6bbc039',
        key: 'Address',
        value: '',
      }],
      domain: '5b6ab060f60c0524980fa23b',
      name: 'Company 2',
      timestamp: new Date('2018-08-23T12:19:19.758Z'),
    },
  ];

  const contacts: Contact[] = [
    {
      _id: '5b7eb55995019343c59b0c8c',
      custom: [{
        _id: '5b9110616ec37621e6b17bc7',
        key: 'Phone',
        value: '',
      },
      {
        _id: '5b9110616ec37621e6b17bc6',
        key: 'Email',
        value: '',
      }],
      domain,
      name: 'Bob',
      timestamp: new Date('2018-09-06T11:32:49.518Z'),
    },
    {
      _id: '5b7eac4a6a0682428f35485e',
      custom: [{
        _id: '5b9110616ec37621e6b17bc7',
        key: 'Phone',
        value: '',
      },
      {
        _id: '5b9110616ec37621e6b17bc6',
        key: 'Email',
        value: '',
      }],
      domain,
      name: 'Mike',
      timestamp: new Date('2018-09-06T11:32:49.518Z'),
    },
  ];

  const settings: DomainSettings = {
    customFields: [
      {
        _id: '5b97a9bb8ef7eb47231396ad',
        isAlwaysShownInAddDialog: false,
        isAlwaysVisible: true,
        isDefault: true,
        model: 'Contact',
        name: 'Phone',
        type: 'string',
      },
    ],
    timezone: 'Etc/UTC',
  };

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow
      (
      <EditLeadSidebar
        loadLead={noop}
        editLead={editLead}
        loadContacts={noop}
        loadOrganizations={noop}
        updateContact={noop}
        updateLead={noop}
        updateOrganization={noop}
        contacts={contacts}
        organizations={organizations}
        settings={settings}
      />,
      );
  });


  it('render EditLeadSidebar component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('render correct EditCard quantity', () => {
    wrapper.update();
    expect(wrapper.find('EditCard')).toHaveLength(2);
  });

  it('should render correct EmptyCard quantity', () => {
    editLead = {
      ...editLead,
      contact: undefined,
    };
    wrapper = shallow
      (
      <EditLeadSidebar
        loadLead={noop}
        editLead={editLead}
        loadContacts={noop}
        loadOrganizations={noop}
        updateContact={noop}
        updateLead={noop}
        updateOrganization={noop}
        contacts={contacts}
        organizations={organizations}
        settings={settings}
      />,
      );
    expect(wrapper.find('EmptyCard')).toHaveLength(1);

    editLead = {
      ...editLead,
      contact: undefined,
      organization: undefined,
    };

    wrapper = shallow
      (
      <EditLeadSidebar
        loadLead={noop}
        editLead={editLead}
        loadContacts={noop}
        loadOrganizations={noop}
        updateContact={noop}
        updateLead={noop}
        updateOrganization={noop}
        contacts={contacts}
        organizations={organizations}
        settings={settings}
      />,
      );
    expect(wrapper.find('EmptyCard')).toHaveLength(2);
  });
});
