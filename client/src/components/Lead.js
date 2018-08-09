import React from 'react'
import './Lead.css'
import {Link} from 'react-router-dom'
import profile from '../img/profile.svg'


const lead = (props) => {
    let lead = props.lead;

    return (
        <div className='small-lead-container'>
            <div className='small-lead-info'>
                <Link className='small-lead-info-link' to={props.link} dragable>
                    <strong><img className='small-lead-avatar'
                                 src={lead.owner && lead.owner.avatar? lead.owner.avatar : profile}/> {lead.name}</strong>

                        {lead.contact && lead.contact.name?
                            <small>{lead.contact.name}</small>:
                            <small style={{height:'20px'}}> </small>}
                </Link>
            </div>
        </div>
    )
};
export default lead