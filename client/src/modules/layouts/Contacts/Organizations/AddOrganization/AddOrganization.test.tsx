import { shallow } from 'enzyme';
import * as React from 'react';
import DomainSettings from '../../../../../models/DomainSettings';
import * as addModalStyles from '../../../../../styles/addingModal.css';
import { AddOrganization } from './AddOrganization';

describe('<AddOrganization /> :', () => {
  let wrapper: any;
  const auth: any = {
    userid: '5b97a9aeb35f5710b39e3913',
  };
  let addOrganization: any;
  let isModalOpen: boolean;
  const openModal= () => {
    isModalOpen = true;
  };
  const closeModal= () => {
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
    addOrganization = jest.fn();
    isModalOpen = false;
    wrapper = shallow(
      <AddOrganization
        addOrganization={addOrganization}
        auth={auth}
        domainSettings={settings}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find(`button.${addModalStyles.saveButton}`).at(0).text()).toBe('Add organization');
    expect(wrapper.state().isModaOpen).toBeFalsy();
  });

  it('should open modal on Add organization button click', () => {
    const addOrganizationBtn = wrapper.find(`button.${addModalStyles.saveButton}`).at(0);
    addOrganizationBtn.simulate('click');
    expect(wrapper.find(`header.${addModalStyles.formHeader}`).text()).toBe('Add new organization');
  });

  it('should create organization with set params on save click', () => {
    const addOrganizationBtn = wrapper.find(`button.${addModalStyles.saveButton}[children="Add organization"]`);
    addOrganizationBtn.simulate('click');

    const nameInput = wrapper.find(`input[name='name']`);
    const organizationName = 'EpicSoftware';
    nameInput.simulate('change', { target: { value: organizationName } });

    const addressInput = wrapper.find(`input[name='address']`);
    const organizationAddress = '1-st av. 25';
    addressInput.simulate('change', { target: { value: organizationAddress } });

    const saveBtn = wrapper.find(`button.${addModalStyles.saveButton}[children="Save"]`);
    saveBtn.simulate('click');
    expect(addOrganization).toHaveBeenCalledWith({
      custom: [{
        key: settings.customFields[2]._id,
        value: organizationAddress,
      }],
      name: organizationName,
    });
  });
});
