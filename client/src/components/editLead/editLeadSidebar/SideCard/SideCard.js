import React, { Component } from "react";
import '../EditCard.css';
import SideCardTitle from "./SideCardTitle";

class SideCard extends Component {

    render() {
        return (
            <div className='SideCard'>
                <SideCardTitle titleName='Person'/>
            </div>
        );
    }

}

export default SideCard;