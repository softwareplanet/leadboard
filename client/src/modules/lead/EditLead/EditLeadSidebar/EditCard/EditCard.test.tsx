import { shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import someIcon from '../../../../../assets/img/call-activity.svg';
import Contact from '../../../../../models/Contact';
import CustomFieldData from '../../../../../models/customFields/CustomFieldData';
import Organization from '../../../../../models/Organization';
import CardField from './CardFields/CardField';
import MainField from './CardFields/MainField';
import EditCard from './EditCard';

describe('<EditCard />', () => {

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
    domain: '5b97d2273485d2406c815ba0',
    name: 'Bob',
    timestamp: new Date(),
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain: '5b7ea5997adb5755f6bbc02b',
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
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
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain: '5b7ea5997adb5755f6bbc02b',
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
  };

  const customFields: CustomFieldData[] = [
    {
      isAlwaysVisible: true,
      isDefault: true,
      isShownInAddDialog: false,
      key: '5b97d3573485d2406c818ba0',
      model: 'Organization',
      name: 'Address',
      type: 'string',
      value: '',
    },
    {
      isAlwaysVisible: true,
      isDefault: true,
      isShownInAddDialog: false,
      key: '5b97d3573485d2406c818ba0',
      model: 'Contact',
      name: 'Address',
      type: 'string',
      value: '',
    },
  ];

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow
    (
      <EditCard
        addCustomFieldToDomain={noop}
        editCustomFieldInDomain={noop}
        model={contact}
        modelType="Contact"
        customFieldsSettings={[]}
        onUpdate={jest.fn()}
        title="Person"
        icon={someIcon}
        customFields={customFields}
        deleteCustomField={jest.fn()}
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
    wrapper = shallow
    (
      <EditCard
        addCustomFieldToDomain={noop}
        editCustomFieldInDomain={noop}
        model={organization}
        modelType="Organization"
        customFieldsSettings={[]}
        onUpdate={jest.fn()}
        title="Person"
        icon={someIcon}
        customFields={customFields}
        deleteCustomField={jest.fn()}
      />,
    );
    wrapper.update();
    expect(wrapper.find(CardField).length).toEqual(2);
  });
});
