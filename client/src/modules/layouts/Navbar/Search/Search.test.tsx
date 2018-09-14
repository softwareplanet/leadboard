import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import * as noop from 'lodash';
import * as React from 'react';
import { Search } from './Search';

configure({ adapter: new ReactSixteenAdapter });

describe('<Search /> :', () => {
  let wrapper: any;
  const search: any = {};
  const history: any = {};

  it('should render Search component', () => {
    wrapper = shallow(<Search history={history} search={search} loadSearchResult={noop} />);
    expect(wrapper.exists()).toBe(true);
  });
});
