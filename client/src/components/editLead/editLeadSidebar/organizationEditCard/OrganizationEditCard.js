import React, { Component } from "react";
import "../EditCard.css";

export default class PersonEditCard extends Component {
    render() {
        return (
            <div className='SideCard'>
                <div className='SideCard__title'>
                    <span className='SideCard__title-name'>
                        Organization
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
                                        Address
                                    </div>

                                </div>
                                <span className='SideCard__field-value-add-value'>
                                <div className='SideCard__field-value-add-button'>
                                        + Add value
                                </div>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
