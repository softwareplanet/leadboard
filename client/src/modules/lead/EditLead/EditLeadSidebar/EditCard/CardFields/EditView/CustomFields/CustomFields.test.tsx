import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import CustomFieldCard from '../CustomFieldCard/CustomFieldCard';
import CustomFields from './CustomFields';
import * as styles from './CustomFields.css';

describe('<CustomFields />', () => {
  const customs = [
    {
      _id: '5b97d3573485d2406c818ba0',
      isAlwaysVisible: true,
      isDefault: true,
      isShownInAddDialog: false,
      model: 'Contact',
      name: 'Address',
      type: 'string',
    },
    {
      _id: '5b97d3573485d2406c818ba0',
      isAlwaysVisible: true,
      isDefault: true,
      isShownInAddDialog: false,
      model: 'Contact',
      name: 'Address',
      type: 'string',
    },
  ];

  let wrapper: any;
  const callback = jest.fn();
  beforeEach(() => {
    wrapper = shallow
    (
      <CustomFields
        deleteCustomField={jest.fn()}
        addCustomFieldToDomain={noop}
        modelType="Contact"
        editCustomFieldInDomain={noop}
        customFields={customs}
        closeEditCustomFieldsMode={callback}
      />,
    );
  });

  it('should render CustomFields component', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render all props elements', () => {
    expect(wrapper.find(CustomFieldCard).length).toEqual(2);
  });

  it('should exec closeEditCustomFieldsMode', () => {
    const button = wrapper.find(`${styles.button}`);
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
