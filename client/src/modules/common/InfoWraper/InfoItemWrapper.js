import React, { Component } from "react";
import PropTypes from "prop-types";
import defaultStyles from "./InfoItemWrapper.css";
import defaultIcon from "../../../assets/note-icon.svg";

const space = "&nbsp;";

class InfoItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyles: this.props.containerStyles ? this.props.containerStyles : defaultStyles.container,
      iconBoxStyles: this.props.iconBoxStyles ? this.props.iconBoxStyles : defaultStyles.iconBox,
      iconWrapperStyles: this.props.iconWrapperStyles ? this.props.iconWrapperStyles : defaultStyles.iconWrapper,
      iconStyles: this.props.iconStyles ? this.props.iconStyles : defaultStyles.icon,
      icon: this.props.icon ? this.props.icon : defaultIcon,
      arrowStyles: this.props.arrowStyles ? this.props.arrowStyles : defaultStyles.arrow,
      cardStyles: this.props.cardStyles ? this.props.cardStyles : defaultStyles.card,
    };
  }

  render() {
    return (
      <div className={this.state.containerStyles}>
        <span className={this.state.iconBoxStyles}>
          <span className={this.state.iconWrapperStyles}>
            <img src={this.state.icon} alt="note" className={this.state.iconStyles} />
          </span>
	      </span>
        <span className={this.state.arrowStyles} />
        <div className={this.state.cardStyles}>
          {this.props.component}
          <div className="fade">
            <div>
              {space}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfoItemWrapper.protoTypes = {
  component: PropTypes.object.isRequired,
  containerStyles: PropTypes.object,
  iconBoxStyles: PropTypes.object,
  iconWrapperStyles: PropTypes.object,
  iconStyles: PropTypes.object,
  icon: PropTypes.object,
  arrowStyles: PropTypes.object,
  cardStyles: PropTypes.object,
};

export default InfoItemWrapper;