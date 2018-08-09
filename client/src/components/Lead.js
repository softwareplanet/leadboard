import React from 'react'
import './Lead.css'
import {Link} from 'react-router-dom'
import profile from '../img/profile.svg'


const lead = (props) => {
    let lead = props.lead;

    return (
        <div className='small-lead-container'>
            <div className='small-lead-info'>
                <Link className='small-lead-info-link' to={`leads/${lead._id}`} dragable>
                    <strong><img className='small-lead-avatar'
                                 src={lead.owner? lead.owner.avatar : profile}/> {lead.name}</strong>
                    <small>
                        {lead.contact?lead.contact.name:''}
                    </small>
                </Link>
            </div>
        </div>
    )
};
export default lead