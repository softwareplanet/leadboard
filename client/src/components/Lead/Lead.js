import React from 'react'
import './Lead.css'
import {Link} from 'react-router-dom'
import profile from '../img/profile.svg'
import PropTypes from 'prop-types'


const lead = (props) => {
    let lead = props.lead;

    return (
        <div className='Lead__container'>
            <div className='Lead__info'>
                <Link className='Lead__link-info' to={props.link}>
                    <strong><img className='Lead__avatar'
                                 src={lead.owner && lead.owner.avatar ? lead.owner.avatar : profile}/>
                        {lead.name}
                    </strong>

                    {lead.contact ?
                        <small>{lead.contact.name ? lead.contact.name : lead.contact.organization.name}</small> :
                        <small style={{height: '20px'}}> </small>}
                </Link>
            </div>
        </div>
    )
};


lead.propTypes = {
    link: PropTypes.string.isRequired,
    lead: PropTypes.object.isRequired
};
export default lead