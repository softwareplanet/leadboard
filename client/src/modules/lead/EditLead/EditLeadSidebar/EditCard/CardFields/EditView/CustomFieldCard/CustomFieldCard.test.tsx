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

  let wrapper;

  it('renders without crashing', () => {
    wrapper = shallow
    (
      <CustomFieldCard
        customSettings={settings}
        addDialogTitle={'Person'}
        editCustomFieldInDomain={noop}
      />
    );
    expect(wrapper.length).toBe(1);
  });
});
