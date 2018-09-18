import { shallow } from 'enzyme';
import * as React from 'react';
import Funnel from '../../../models/Funnel';
import { Funnels } from './Funnels';
import * as styles from './Funnels.css';

const domainId = '5b9bbf818893d17d417a3d7c';
const selectedFunnel: Funnel = {
  _id: '5b9bbf818893d17d417a3d7e',
  name: 'First Pipeline',
  domain: '5b9bbf818893d17d417a3d7c',
  timestamp: new Date('2018-09-14T14:02:41.804Z')
}
const funnels: Funnel[] = [{
    _id: '5b9bbf818893d17d417a3d7e',
    name: 'First Pipeline',
    domain: '5b9bbf818893d17d417a3d7c',
    timestamp: new Date('2018-09-14T14:02:41.804Z'),
  },
  {
    _id: '5b9bc4258893d17d417a3d8b',
    name: 'Second Pipeline',
    domain: '5b9bbf818893d17d417a3d7c',
    timestamp: new Date('2018-09-14T14:22:29.218Z'),
  }
];

describe('<Funnels />', () => {
  it('should render correct tabs', () => {
    const wrapper = shallow
    (
      <Funnels 
        funnels={funnels} 
        domainId={domainId} 
        selectedFunnel={selectedFunnel} 
        loadFunnels={jest.fn()} 
        createFunnel={jest.fn()} 
        selectFunnel={jest.fn()}
      />
    )
    expect(wrapper.find(`.${styles.tab}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.tabActive}`)).toHaveLength(1);
  });

  it('should call select funnel action', () => {
    const selectFunnel = jest.fn();
    const wrapper = shallow
    (
      <Funnels 
        funnels={funnels} 
        domainId={domainId} 
        selectedFunnel={selectedFunnel} 
        loadFunnels={jest.fn()} 
        createFunnel={jest.fn()} 
        selectFunnel={selectFunnel}
      />
    )
    const tab = wrapper.find(`.${styles.tab}`);
    tab.simulate('click');
    expect(selectFunnel).toHaveBeenCalled();
    expect(selectFunnel).toHaveBeenCalledTimes(1);
  });
});
