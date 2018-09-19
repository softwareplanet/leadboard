import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import DeleteButton from './DeleteButton';

describe('<DeleteButton />', () => {
  let wrapper: any;
  const onDelete = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<DeleteButton onClick={onDelete} styles={'deleteButton'} />);
  });

  it('should render deleteButton component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call deleteButton method on click delete button', () => {
    const button = wrapper.find('.deleteButton');
    button.simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
