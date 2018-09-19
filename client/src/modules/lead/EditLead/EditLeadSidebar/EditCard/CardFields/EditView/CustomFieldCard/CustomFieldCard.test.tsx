import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import CustomFieldCard from './CustomFieldCard';

describe('<CustomFieldCard />', () => {
  const settings = {
    _id: '5b97a9bb8ef7eb47231396ad',
    isAlwaysVisible: true,
    isDefault: true,
    isShownInAddDialog: false,
    model: 'Contact',
    name: 'Phone',
    type: 'string',
  };

  let wrapper: any;
  const onDelete = jest.fn();
  beforeEach(() => {
    wrapper = shallow
    (
      <CustomFieldCard
        customSettings={settings}
        editCustomFieldInDomain={noop}
        deleteCustomField={onDelete}
      />,
    );
  });

  it('renders without crashing', () => {
    wrapper = shallow
    (
      <CustomFieldCard
        deleteCustomField={onDelete}
        customSettings={settings}
        editCustomFieldInDomain={noop}
      />,
    );
    expect(wrapper.length).toBe(1);
  });

  window.confirm = jest.fn(() => true);
  it('should call deleteCustomField method on click delete button', () => {
    const button = wrapper.find('.deleteButton');
    button.simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
