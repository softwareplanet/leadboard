import { shallow } from 'enzyme';
import * as React from 'react';
import CustomFieldEditCard from './CustomFieldEditCard';
import * as styles from './CustomFieldEditCard.css';

describe('<CustomFieldEditCard />', () => {
  const customs = [
    {
      isShownInAddDialog: false,
      isAlwaysVisible: true,
      isDefault: true,
      model: 'Organization',
      name: 'Address',
      type: 'string',
    },
    {
      isShownInAddDialog: false,
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
        model={'Contact'}
        addDialogTitle={'Person'}
        field={customs[0]}
        onSave={callback}
        onCancel={callback}
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
