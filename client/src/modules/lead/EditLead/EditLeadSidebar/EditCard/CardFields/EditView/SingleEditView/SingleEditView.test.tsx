import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import SingleEditView from './SingleEditView';

describe('<SingleEditView />', () => {
  const contact = {
    name: 'Bob',
    organization: {
      name: 'Testing Inc',
    },
  };
  let wrapper;

  it('should renders without crashing', () => {
    wrapper = shallow
    (
      <SingleEditView
        fieldName={'Name'}
        fieldValue={contact.organization.name}
        onCancel={noop}
        onChange={noop}
        fieldKey={''}
      />,
    );
    expect(wrapper.length).toBe(1);
  });

  it('should reacts on cancel properly', () => {
    const spy = jest.fn();
    wrapper = shallow
    (
      <SingleEditView
        fieldName={'Name'}
        fieldValue={contact.organization.name}
        onCancel={spy}
        onChange={noop}
        fieldKey={''}
      />,
    );
    const buttonCancel = wrapper.find('.cancelButton');
    buttonCancel.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handles input change and save properly', () => {
    const spy = jest.fn();
    wrapper = shallow
    (
      <SingleEditView
        fieldName={'Name'}
        fieldValue={contact.organization.name}
        onChange={spy}
        onCancel={noop}
        fieldKey={''}
      />,
    );
    const inputGroup = wrapper.find('EditFieldGroup');
    inputGroup.simulate('change');

    const buttonSave = wrapper.find('.saveButton');
    buttonSave.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
