import { mount, shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import DomainSettings from '../../../models/DomainSettings';
import { CustomizeFields } from './CustomizeFields';

describe('<CustomizeFields />', () => {
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

  let wrapper: any;
  const addCustomField = jest.fn();
  const editCustomField = jest.fn();
  beforeEach(() => {
    wrapper = shallow
    (<CustomizeFields
      addCustomFieldToDomain={addCustomField}
      editCustomFieldInDomain={editCustomField}
      settings={settings}
    />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct amount of custom fields for each entity', () => {

    wrapper = mount
    (<CustomizeFields
      addCustomFieldToDomain={addCustomField}
      editCustomFieldInDomain={editCustomField}
      settings={settings}
    />);

    const tableBody = wrapper.find('tbody');
    expect(wrapper.state().selectedTabIndex).toBe(0);
    expect(tableBody.find('tr')).toHaveLength(0);
  });
});
