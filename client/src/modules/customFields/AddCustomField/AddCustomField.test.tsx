import { shallow } from 'enzyme';
import * as React from 'react';
import * as ReactModal from 'react-modal';
import AddCustomField from './AddCustomField';
import * as styles from './AddCustomField.css';


describe('<AddCustomField />', () => {
  let wrapper: any;
  const addCustomField = jest.fn();
  const MODEL_NAMES: string[] = ['Lead', 'Organization', 'Contact'];
  beforeEach(() => {
    wrapper = shallow
    (<AddCustomField
      addCustomField={addCustomField}
      modelName={MODEL_NAMES[1]}
    />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays correct header on opening', () => {
    expect(wrapper.find(`.${styles.modalHeader}`).text()).toEqual('Add a field for organizations');
  });

  it('displays error message when trying to save with empty name', () => {
    wrapper.find(`.${styles.addButton}`).simulate('click');
    expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(true);
    wrapper.find(`.${styles.buttonSave}`).simulate('click');
    expect(wrapper.state().isValidationShown).toBeTruthy();
    expect(wrapper.find(`div.${styles.error}`).text()).toBe('Field cannot be empty');
  });
});
