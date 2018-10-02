import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import ImportsPage from './ImportsPage';

describe('<ImportsPage />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ImportsPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
