import { configure, mount, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import * as noop from 'lodash';
import * as React from 'react';
import { LeadAutocompleteWrapper } from './LeadAutocompleteWrapper';

configure({ adapter: new ReactSixteenAdapter });

describe('<Search /> :', () => {
  let wrapper: any;
  const lead: any = {_id: '5bab2ba3baf6781b6349053f', domain: '5ba09fc5cbf5106e2d6758f4', owner: {}, stage: {}, name: 'Bob lead', order: 1, contact: {}, status: 'InProgress', timestamp: '2018-09-26T06:48:03.486Z', custom: []};
  const leads: any = [];
  const callback: any = jest.fn();

  it('should render Search component', () => {
    wrapper = mount(<LeadAutocompleteWrapper lead={lead} leads={leads} loading={false} loadSearchResult={noop} setLead={callback} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should use setLead if item from dropdown is clicked', () => {
    wrapper = shallow(<LeadAutocompleteWrapper lead={lead} leads={leads} loading={false} loadSearchResult={noop} setLead={callback} />);
    console.log(wrapper.debug());
    
  });
});
