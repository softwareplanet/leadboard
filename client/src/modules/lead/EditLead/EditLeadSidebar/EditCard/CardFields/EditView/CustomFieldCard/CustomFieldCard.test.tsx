import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import CustomFieldCard from './CustomFieldCard';

describe('<CustomFieldCard />', () => {
  const settings = {
    _id: '5b97a9bb8ef7eb47231396ad',
    isAlwaysShownInAddDialog: false,
    isAlwaysVisible: true,
    isDefault: true,
    model: 'Contact',
    name: 'Phone',
    type: 'string',
  };

  let wrapper: any;
  const onDelete = jest.fn();
  beforeEach(() => {
    wrapper = shallow
    (
      <CustomFieldCard customSettings={settings} deleteCustomField={onDelete} />,
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  window.confirm = jest.fn(() => true);
  it('should call deleteCustomField method on click delete button', () => {
    const button = wrapper.find('.deleteButton');
    // console.log(button.html());
    button.simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
