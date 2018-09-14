import { shallow } from 'enzyme';
import * as React from 'react';
import { Funnel } from './Funnel';
import FunnelModel from '../../../../models/Funnel';
import * as styles from './Funnel.css';

const funnel: FunnelModel = {
  _id: '5b9a3676d7c72c478f2fa42e',
  name: 'Funnel',
  domain: '5b9a3676d7c72c478f2fa42c',
  timestamp: new Date('2018-09-13T10:05:42.656Z')
}
describe('<Funnel />', () => {
  it('should send correct data on save', () => {
    const updateFunnel = jest.fn();
    let wrapper = shallow(<Funnel updateFunnel={updateFunnel} funnel={funnel}/>)
    wrapper.find(`.${styles.edit}`).simulate('click');
    wrapper.find(`.${styles.input}`).simulate('change', { target: { value: 'New funnel' } });
    wrapper.find(`.${styles.save}`).simulate('click');
    expect(updateFunnel.mock.calls[0]).toMatchObject(['5b9a3676d7c72c478f2fa42e', {name: 'New funnel'}]);
  });
});