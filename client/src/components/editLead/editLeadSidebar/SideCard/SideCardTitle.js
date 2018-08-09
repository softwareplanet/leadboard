import React, { Component } from "react";
import '../EditCard.css';

class SideCardTitle extends Component {

    render() {
        return (
            <div className='SideCardTitle'>
                <div className='SideCardTitle__name'>
                    {this.props.titleName}
                </div>
                <div className='SideCard__actions'>

                </div>
            </div>
        );
    }

}

export default SideCardTitle;