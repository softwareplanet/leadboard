import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import someIcon from '../../../../../assets/call-activity.svg';
import Contact from '../../../../../models/Contact';
import CustomFieldData from '../../../../../models/customFields/CustomFieldData';
import Domain from '../../../../../models/Domain';
import Organization from '../../../../../models/Organization';
import CardField from './CardFields/CardField';
import MainField from './CardFields/MainField';
import EditCard from './EditCard';

describe('<EditCard />', () => {
  const domain: Domain = {
    _id: '5b86a96eed17641891c5011b',
    name: 'interLink',
    settings: {
      customFields: [],
      timezone: 'UTC',
    },
    timestamp: new Date('2018-08-29T14:10:54.395Z'),
  };

  const contact: Contact = {
    _id: '5b97d3573485d2406c815ba0',
    custom: [
      {
        key: '5b97d2573485d2406c815ba0',
        value: '+380974040018',
      },
      {
        key: '5b97d3173485d2406c815ba0',
        value: 'yarik335@gmail.com',
      },
    ],
    domain,
    name: 'Bob',
    timestamp: new Date(),
  };

  const organization: Organization = {
    _id: '5b17d2573485d2406c815ba0',
    custom: [
      {
        key: 'Address',
        value: 'Saint street',
      },
    ],
    domain: '5b97d2273485d2406c815ba0',
    name: 'RedDog inc',
    timestamp: new Date(),
  };

  const customFields: CustomFieldData[] = [
    {
      isShownInAddDialog: false,
      isAlwaysVisible: true,
      isDefault: true,
      key: '5b97d3573485d2406c818ba0',
      model: 'Organization',
      name: 'Address',
      type: 'string',
      value: '',
    },
    {
      isShownInAddDialog: false,
      isAlwaysVisible: true,
      isDefault: true,
      key: '5b97d3573485d2406c818ba0',
      model: 'Contact',
      name: 'Address',
      type: 'string',
      value: '',
    },
  ];

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <EditCard
        addCustomFieldToDomain={noop}
        editCustomFieldInDomain={noop}
        model={contact}
        customFieldsSettings={[]}
        onUpdate={jest.fn()}
        title={'Person'}
        icon={someIcon}
        customFields={customFields}
      />,
    );
  });

  it('render EditCard component', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('render MainField component', () => {
    expect(wrapper.find(MainField).exists()).toEqual(true);
  });

  it('render correct quantity for CardFields component for Contact', () => {
    expect(wrapper.find(CardField).length).toEqual(2);
  });

  it('render correct quantity for CardFields component for Organization', () => {
    wrapper = shallow(
      <EditCard
        addCustomFieldToDomain={noop}
        editCustomFieldInDomain={noop}
        model={organization}
        customFieldsSettings={[]}
        onUpdate={jest.fn()}
        title={'Person'}
        icon={someIcon}
        customFields={customFields}
      />,
    );
    wrapper.update();
    expect(wrapper.find(CardField).length).toEqual(2);
  });
});
