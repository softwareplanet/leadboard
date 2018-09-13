import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import EditFieldGroup from './EditFieldGroup';

const customField = {
  fieldKey: '5b86a96eed17641891c5011b',
  name: 'Address',
  value: 'Grushevskoho st.',
};

let fieldGroupWrapper: any;
const handleChange = jest.fn();
beforeEach(() => {
  fieldGroupWrapper = shallow
  (
    <EditFieldGroup
      fieldKey={customField.fieldKey}
      value={customField.value}
      name={customField.name} onChange={handleChange}
    />,
  );
});

describe('<EditFieldGroup />', () => {
  it('should renders without crashing', () => {
    expect(fieldGroupWrapper.exists()).toEqual(true);
  });

  it('should renders props', () => {
    expect(fieldGroupWrapper.find('span').text()).toBe(customField.name);
    expect(fieldGroupWrapper.find('input').props().defaultValue).toBe(customField.value);
  });

  it('should reacts correctly on change', () => {
    const input = fieldGroupWrapper.find('input');
    const newValue = 'Gogolya st.';
    input.simulate('change', {
      target: {
        id: `input${customField.fieldKey}`,
        value: newValue,
      },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
