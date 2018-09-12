import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import CustomFieldView from './CustomFieldView';

describe('<CustomFieldView/>', () => {
  const settings = {
    _id: '5b97a9bb8ef7eb47231396ad',
    isAlwaysShownInAddDialog: false,
    isAlwaysVisible:true,
    isDefault: true,
    model: 'Contact',
    name: 'Phone',
    type: 'string',
  };
  
  let wrapper;

  it('renders without crashing', () => {
    wrapper = shallow(<CustomFieldView customSettings={settings}/>);
    expect(wrapper.length).toBe(1);
  });
});
