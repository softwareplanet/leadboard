import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Lead from './Lead'
import profile from '../../img/profile.svg'


configure({adapter: new Adapter});

describe('<Lead /> :', () => {
    let wrapper;
    let lead = {
        _id: '5b6c598084412364d01a73b4',
        name: 'Test lead',
        owner: {},
        contact: {
            name: 'Test contact name',
            organization: {
                name:'Test organization name'
            }
        }
    };

    let link = `/funnel/5b6bd8112e46b819428f9b52/lead/5b6c598084412364d01a73b4`;

    beforeEach(() => {
        wrapper = shallow(<Lead lead={lead} link={link} />);
    });

    it('should render default avatar if domain owner avatar is absent', () => {
        expect(wrapper.find('img').map((node) => node.prop('src')).some(prop => prop === profile)).toBeTruthy();
    });

    it('should render empty span if organization and contact are absent', () => {
        let contactEmptyLead = {...lead};
        delete contactEmptyLead.contact;
        wrapper = shallow(<Lead link={link} lead={contactEmptyLead}/>);
        expect(wrapper.find('small')
            .map((node) => node.prop('children'))
            .some(prop => prop === ' ')).toBeTruthy();
    });

    it('should render organization name if contact person is absent', () => {
        let contactNameEmptyLead = {...lead};
        delete contactNameEmptyLead.contact.name;
        wrapper = shallow(<Lead link={link} lead={contactNameEmptyLead}/>);
        expect(wrapper.find('small')
            .map((node) => node.prop('children'))
            .some(prop => prop === contactNameEmptyLead.contact.organization.name)).toBeTruthy();
    });

});