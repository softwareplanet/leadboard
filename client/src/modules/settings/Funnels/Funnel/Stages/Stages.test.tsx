import { shallow } from 'enzyme';
import * as React from 'react';
import Funnel from '../../../../../models/Funnel';
import StageModel from '../../../../../models/Stage';
import { Stages } from './Stages';
import StageView from './StageView/StageView';

const stages: StageModel[] = [{
    _id: '5b9bbf818893d17d417a3d7f',
    name: 'Awareness',
    funnel: '5b9bbf818893d17d417a3d7e',
    order: 1,
    timestamp: new Date('2018-09-14T14:02:41.804Z'),
  },
  {
    _id: '5b9bbf818893d17d417a3d80',
    name: 'Interest',
    funnel: '5b9bbf818893d17d417a3d7e',
    order: 2,
    timestamp: new Date('2018-09-14T14:02:41.804Z'),
}];
const selectedFunnel: Funnel = {
  _id: '5b9bbf818893d17d417a3d7e',
  name: 'First Pipeline',
  domain: '5b9bbf818893d17d417a3d7c',
  timestamp: new Date('2018-09-14T14:02:41.804Z')
}

describe('<Stages />', () => {
  it('should render 2 stages', () => {
    const wrapper = shallow
    (
      <Stages 
        loadStages={jest.fn()} 
        updateStageName={jest.fn()} 
        selectedFunnel={selectedFunnel}
        stages={stages}
      />
    )
    expect(wrapper.find(StageView)).toHaveLength(2);
  });
})
