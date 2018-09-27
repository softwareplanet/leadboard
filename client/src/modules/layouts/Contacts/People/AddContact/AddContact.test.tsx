import { shallow } from 'enzyme';
import * as React from 'react';
import DomainSettings from '../../../../../models/DomainSettings';
import * as addModalStyles from '../../../../../styles/addingModal.css';
import { AddContact } from './AddContact';

describe('<AddOrganization /> :', () => {
  let wrapper: any;
  const auth: any = {
    userid: '5b97a9aeb35f5710b39e3913',
  };
  let addContact: any;
  let loadOrganizations: any;
  let loadAggregatedContacts: any;
  let isModalOpen: boolean;
  const openModal = () => {
    isModalOpen = true;
  };
  const closeModal = () => {
    isModalOpen = false;
  };
  const settings: DomainSettings = {
    customFields: [
      {
        _id: '5b97a9aeb35f5710b39e3951',
        isAlwaysVisible: true,
        isDefault: true,
        isShownInAddDialog: false,
        model: 'Contact',
        name: 'Phone',
        type: 'string',
      },
      {
        _id: '5b97a9aeb35f5710b39e3950',
        isAlwaysVisible: true,
        isDefault: true,
        isShownInAddDialog: false,
        model: 'Contact',
        name: 'Email',
        type: 'string',
      },
      {
        _id: '5b97a9aeb35f5710b39e394f',
        isAlwaysVisible: true,
        isDefault: true,
        isShownInAddDialog: false,
        model: 'Organization',
        name: 'Address',
        type: 'string',
      },
      {
        _id: '5b9fb597070ba24ce3e0b4b3',
        isAlwaysVisible: true,
        isDefault: false,
        isShownInAddDialog: false,
        model: 'Organization',
        name: 'Additional address',
        type: 'string',
      },
    ],
    timezone: 'Etc/UTC',
  };

  beforeEach(() => {
    addContact = jest.fn();
    loadOrganizations = jest.fn();
    loadAggregatedContacts = jest.fn();
    isModalOpen = false;
    wrapper = shallow(
      <AddContact
        addContact={addContact}
        auth={auth}
        domainSettings={settings}
        isModalOpen={isModalOpen}
        loadAggregatedContacts={loadAggregatedContacts}
        loadOrganizations={loadOrganizations}
        openModal={openModal}
        organizations={[]}
        closeModal={closeModal}
      />,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find(`button.${addModalStyles.saveButton}`).at(0).text()).toBe('Add person');
    expect(wrapper.state().isModaOpen).toBeFalsy();
  });

  it('should open modal on Add person button click', () => {
    const addOrganizationBtn = wrapper.find(`button.${addModalStyles.saveButton}`).at(0);
    addOrganizationBtn.simulate('click');
    expect(wrapper.find(`header.${addModalStyles.formHeader}`).text()).toBe('Add new person');
  });

  it('should create organization with set params on save click', () => {
    const addOrganizationBtn = wrapper.find(`button.${addModalStyles.saveButton}[children="Add person"]`);
    addOrganizationBtn.simulate('click');

    const nameInput = wrapper.find(`input[name='name']`);
    const contactName = 'Alice Smith';
    nameInput.simulate('change', {
      target: {
        name: 'name',
        value: contactName,
      },
    });

    const phoneInput = wrapper.find(`input[name='${settings.customFields[0]._id}']`);
    const contactPhone = '+380472586347';
    phoneInput.simulate('change', {
      target: {
        name: settings.customFields[0]._id,
        value: contactPhone,
      },
    });

    const emailInput = wrapper.find(`input[name='${settings.customFields[1]._id}']`);
    const contactEmail = 'alicesmith@example.com';
    emailInput.simulate('change', {
      target: {
        name: settings.customFields[1]._id,
        value: contactEmail,
      },
    });

    const saveBtn = wrapper.find(`button.${addModalStyles.saveButton}[children="Save"]`);
    saveBtn.simulate('click');
    expect(addContact).toHaveBeenCalledWith({
      custom: [
        {
          key: settings.customFields[0]._id,
          value: contactPhone,
        },
        {
          key: settings.customFields[1]._id,
          value: contactEmail,
        },
      ],
      name: contactName,
      organization: '',
    });
  });
});
