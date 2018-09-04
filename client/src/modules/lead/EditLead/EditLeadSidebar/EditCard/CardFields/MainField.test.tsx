import { shallow } from 'enzyme';
import 'jsdom-global/register';
import { noop } from 'lodash';
import * as React from 'react';
import * as sinon from 'sinon';
import MainField from './MainField';

describe('<MainField/>', () => {
  const contact = {
    name: 'Bob',
    organization: {
      name: 'Testing Inc',
    },
  };

  const title = 'Title';
  let wrapper;

  it('render MainField component', () => {
    wrapper = shallow(<MainField value={contact.name} onUpdate={noop} title={title} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correct contact name with props', () => {
    wrapper = shallow(<MainField value={contact.name} onUpdate={noop} title={title} />);
    expect(wrapper.find('span.mainValue').children().text()).toBe(contact.name);
  });

  it('should render correct organization name with props', () => {
    wrapper = shallow(<MainField value={contact.organization.name} onUpdate={noop} title={title} />);
    expect(wrapper.find('span.mainValue').children().text()).toBe(contact.organization.name);
  });

  it('should switch to edit view on click Rename', () => {
    wrapper = shallow(<MainField value={contact.organization.name} onUpdate={noop} title={title} />);
    const buttonRename = wrapper.find('.buttonRename');
    buttonRename.simulate('click');
    expect(wrapper.find('SingleEditView').exists()).toBe(true);
  });

  it('should handle name change properly', () => {
    const spy = sinon.spy();
    wrapper = shallow(<MainField value={contact.organization.name} onUpdate={spy} title={title} />);
    const buttonRename = wrapper.find('button.buttonRename');
    buttonRename.simulate('click');
    expect(wrapper.find('SingleEditView').exists()).toBe(true);

    const nameEditView = wrapper.find('SingleEditView');
    nameEditView.simulate('change', 'Name', 'Microsoft');
    expect(wrapper.find('SingleEditView').exists()).toBe(false);
  });

});

