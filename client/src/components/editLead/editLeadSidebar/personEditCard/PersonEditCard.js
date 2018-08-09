import React, { Component } from "react";
/*import "./PersonEditCard.css";*/
import '../EditCard.css';

 class PersonEditCard extends Component {
     constructor(props){
         super(props);
     }

    render() {
        return (
            <div className='SideCard'>
                <div className='SideCard__title'>
                    <span className='SideCard__title-name'>
                        Person
                    </span>
                    <div className='SideCard__actions'>
                    </div>
                </div>
                <div className='SideCard__fields'>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value'>
                            <div className='SideCard__field-value-wrap'>
                                <span className='SideCard__field-value-badge'>

                                </span>
                                <h3>
                                    <a className='SideCard__field-value-name'>
                                        Bob
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value--highlight'>
                        <div className='SideCard__field-value'>



                            <div className='SideCard__field-label-wrap'>
                                <div className='SideCard__field-label'>
                                        Phone
                                </div>

                            </div>
                            <span className='SideCard__field-value--add-value'>
                                <div className='SideCard__field-value-add-button'>
                                        + Add value
                                </div>
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value--highlight'>
                            <div className='SideCard__field-value'>
                                <div className='SideCard__field-label-wrap'>
                                    <div className='SideCard__field-label'>
                                        Email
                                    </div>
                                </div>
                                <span className='SideCard__field-value--add-value'>
                                    <div className='SideCard__field-value-add-button'>
                                            + Add value
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            /*
            <div className='person-card'>
                <div className='card-title'>
                    <span className="columnItem">Person</span>
                    <div className='column-actions'></div>
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
            </div>*/
        )
    }
}

export default PersonEditCard;