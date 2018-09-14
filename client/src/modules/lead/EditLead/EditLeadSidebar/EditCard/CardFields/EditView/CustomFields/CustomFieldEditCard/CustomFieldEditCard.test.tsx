import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import CustomFieldEditCard from './CustomFieldEditCard';
import * as styles from './CustomFieldEditCard.css';

describe('<CustomFieldEditCard />', () => {
  const customs = [
    {
      _id: '5b97d3573485d2406c818ba0',
      isAlwaysShownInAddDialog: false,
      isAlwaysVisible: true,
      isDefault: true,
      model: 'Organization',
      name: 'Address',
      type: 'string',
    },
    {
      _id: '5b97d3573485d2406c818ba0',
      isAlwaysShownInAddDialog: false,
      isAlwaysVisible: true,
      isDefault: true,
      model: 'Contact',
      name: 'Address',
      type: 'string',
    },
  ];

  let wrapper: any;
  const callback = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <CustomFieldEditCard
        onSave={noop}
        title={'Person'}
        editMode={''}
        field={customs[1]}
        saveEdit={callback}
        cancelEdit={callback}
      />);
  });

  it('should render CustomFieldEditCard component', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should exec saveEdit ', () => {
    const button = wrapper.find(`${styles.saveButton}`);
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('should exec cancelEdit', () => {
    const button = wrapper.find(`${styles.cancelButton}`);
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
