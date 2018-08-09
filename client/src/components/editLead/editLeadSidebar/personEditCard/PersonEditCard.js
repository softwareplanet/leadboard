import React, { Component } from "react";
import "./PersonEditCard.css";

export default class PersonEditCard extends Component {
    render() {
        return (
            <div className='person-card'>
                <div className='card-title'>
                    <span className="columnItem">Person</span>
                </div>

                <div className='fields-list'>
                    <div className='visible'>
                        <div className='item'>
                        <div className='value-wrap'>
                            <span className='bange'>

                            </span>
                            <h3 className='name-label'>
                                <a href='#'>
                                    Bob
                                </a>
                            </h3>
                        </div>
                        </div>
                    </div>

                    <div className='visible'>
                        <div className='item phone-field'>
                            <div className='label-wrap'>
                                <span className="label">Phone</span>
                            </div>
                            <span className='add-value'>
                                <a className='button-add-value'>
                                    + Add value
                                </a>
                            </span>
                        </div>
                    </div>

                    <div className='visible'>
                        <div className='item email-field'>
                            <div className='label-wrap'>
                                <span className="label">Email</span>
                            </div>
                            <span className='add-value'>
                                    <a className='button-add-value'>
                                        + Add value
                                    </a>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
