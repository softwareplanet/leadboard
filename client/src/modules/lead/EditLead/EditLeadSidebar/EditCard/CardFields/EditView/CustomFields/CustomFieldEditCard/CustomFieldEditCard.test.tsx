import { mount, shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import CustomFieldEditCard from './CustomFieldEditCard';

describe('<CustomFieldEditCard />', () => {
  const customField = {
    isAlwaysVisible: true,
    isDefault: true,
    isShownInAddDialog: false,
    model: 'Organization',
    name: 'Address',
    type: 'string',
  };

  let wrapper: any;
  const callback = jest.fn();
  beforeEach(() => {
    wrapper = shallow
    (
      <CustomFieldEditCard
        onDelete={jest.fn()}
        model="Contact"
        field={customField}
        onSave={callback}
        onCancel={callback}
      />,
    );
  });

  it('should render CustomFieldEditCard component', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should exec saveEdit ', () => {
    wrapper = mount
    (
      <CustomFieldEditCard
        onDelete={jest.fn()}
        model="Contact"
        field={customField}
        onSave={callback}
        onCancel={callback}
      />,
    );
    const button = wrapper.find('.saveButton');
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('should exec cancelEdit', () => {
    const button = wrapper.find('.cancelButton');
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
