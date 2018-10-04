import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import { PipeDriveImport } from './PipeDriveImport';

describe('<PipeDriveImport />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow
    (
      <PipeDriveImport
        contactFields={[]}
        contacts={[]}
        domainId={''}
        organizationFields={[]}
        organizations={[]}
        importStatus={{ message: '', status: false }}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
