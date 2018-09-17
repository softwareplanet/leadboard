import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import CustomFieldData from '../../../../../../models/customFields/CustomFieldData';
import CardField from './CardField';

describe('<CardField />', () => {
  let field: CustomFieldData;
  let wrapper: any;

  beforeEach(() => {
    field = {
      isAlwaysVisible: false,
      isDefault: false,
      isShownInAddDialog: false,
      key: '5b97a9aeb35f5710b39e3951',
      model: 'Contact',
      name: 'Phone',
      type: 'string',
      value: '+380930527927',
    };
    wrapper = shallow(<CardField field={field} onUpdate={noop} />);
  });

  it('should render CardField component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render correct props', () => {
    expect(wrapper.find('span.customFieldLabel').text()).toBe(field.name);
    expect(wrapper.find('span.customFieldValue').text()).toBe(field.value);
  });

  it('should render add value link if value is empty', () => {
    field.value = '';
    wrapper = shallow(<CardField field={field} onUpdate={noop} />);
    expect(wrapper.find('span.addValue').length).toBe(1);
  });
});
