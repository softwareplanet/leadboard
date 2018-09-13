import { shallow } from 'enzyme';
import * as React from 'react';
import CustomFieldEditView from './CustomFieldEditView';
import * as styles from './CustomFieldEditView.css';

describe('<CustomFieldEditView />', () => {
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
    wrapper = shallow(<CustomFieldEditView field={customs[1]} saveEdit={callback} cancelEdit={callback} />);
  });

  it('should render CustomFieldEditView component', () => {
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
