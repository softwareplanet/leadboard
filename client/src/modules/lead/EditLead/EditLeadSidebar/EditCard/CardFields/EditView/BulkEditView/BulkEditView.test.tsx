import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import CustomFieldData from '../../../../../../../../models/customFields/CustomFieldData';
import Organization from '../../../../../../../../models/Organization';
import BulkEditView from './BulkEditView';

describe('<BulkEditView />', () => {

  const organization: Organization = {
    _id: '5b97a9aeb35f5710b39e3953',
    custom: [
      { _id: '5b97a9aeb35f5710b39e3951', key: '5b97a9aeb35f5710b39e3952', value: '25th av. 1' },
    ],
    domain: '5b86a96eed17641891c5011b',
    name: 'Testing Inc',
    timestamp: new Date(),
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain: '5b86a96eed17641891c5011c',
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
  };

  const customFields: CustomFieldData[] = [
    {
      isAlwaysVisible: true,
      isDefault: true,
      isShownInAddDialog: true,
      key: organization.custom[0].key,
      model: 'Organization',
      name: 'Address',
      type: 'string',
      value: organization.custom[0].value,
    },
  ];
  let wrapper: any;

  it('should renders without crashing', () => {
    wrapper = shallow
    (
      <BulkEditView
        model={organization}
        onCancel={noop}
        customFields={[]}
        onChange={noop}
      />,
    );
    expect(wrapper.length).toBe(1);
    expect(wrapper.state().custom[0]).toMatchObject(organization.custom[0]);
  });

  it('should reacts on cancel properly', () => {
    const spy = jest.fn();
    wrapper = shallow
    (
      <BulkEditView
        model={organization}
        onCancel={spy}
        customFields={[]}
        onChange={noop}
      />,
    );
    const buttonCancel = wrapper.find('.button');
    buttonCancel.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handles input change and save', () => {
    const spy = jest.fn();
    wrapper = shallow
    (
      <BulkEditView
        model={organization}
        onChange={spy}
        onCancel={noop}
        customFields={customFields}
      />,
    );
    const inputGroup = wrapper.find({ name: customFields[0].name });
    const newAddress = 'Shevchenka st. 123';
    inputGroup.simulate('change', organization.custom[0].key, newAddress);

    const buttonSave = wrapper.find('.saveBtn');
    buttonSave.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().custom[0].value).toEqual(newAddress);
  });
});
