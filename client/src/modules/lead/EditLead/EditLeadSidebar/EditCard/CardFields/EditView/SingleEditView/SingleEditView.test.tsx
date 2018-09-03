import { expect } from 'chai';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import * as sinon from 'sinon';
import SingleEditView from './SingleEditView';

describe('<SingleEditView/>', () => {
  const contact = {
    name: 'Bob',
    organization: {
      name: 'Testing Inc',
    },
  };
  let wrapper;

  it('renders without crashing', () => {
    wrapper = shallow(<SingleEditView
      fieldName={'Name'}
      fieldValue={contact.organization.name}
      onCancel={noop}
      onChange={noop} />);
    expect(wrapper.length).to.equal(1);
  });

  it('reacts on cancel properly', () => {
    const spy = sinon.spy();
    wrapper = shallow(<SingleEditView
      fieldName={'Name'}
      fieldValue={contact.organization.name}
      onCancel={spy}
      onChange={noop} />);
    const buttonCancel = wrapper.find('.cancelButton');
    buttonCancel.simulate('click');
    expect(spy.calledOnce).to.equal(true);
  });

  it('handles input change and save properly', () => {
    const spy = sinon.spy();
    wrapper = shallow(<SingleEditView
      fieldName={'Name'}
      fieldValue={contact.organization.name}
      onChange={spy}
      onCancel={noop} />,
    );
    const inputGroup = wrapper.find('EditFieldGroup');
    inputGroup.simulate('change');

    const buttonSave = wrapper.find('.saveButton');
    buttonSave.simulate('click');
    expect(spy.calledOnce).to.equal(true);
  });
});
