import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SelectStageOnCreation.css";
import addModalStyles from "../AddLead.css";
import ReactTooltip from "react-tooltip";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class SelectStageOnCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstStage: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stages) {
      this.setState({ stagesLoaded: true, firstStage: nextProps.stages[0] });
    }
  }
  componentDidMount() {
    if (this.props.stages) {
      this.props.onStageChange(this.props.stages[0]._id);
    }
  }
  activateStageStyle = e => {
    e.preventDefault();
    e.target.parentNode.parentNode.childNodes.forEach(childNode => {
      if (childNode.className.toString().includes(styles.active)) {
        childNode.className = childNode.className.toString().replace(styles.active, "");
      }
    });
    e.target.parentNode.className += " " + styles.active;
  };

  render() {
    let stagesDisplay;
    if (this.props.stages) {
      stagesDisplay = this.props.stages.map((stage, index) => {
        return (
          <label key={stage._id} className={cx({ radio: true, active: index === 0 })} data-tip={stage.name}>
            <input
              id={"stage-" + stage._id}
              type="radio"
              data-title={stage.name}
              value={stage._id}
              onClick={e => {
                this.activateStageStyle(e);
                this.props.onStageChange(stage._id);
              }}
            />
          </label>
        );
      });
    } else stagesDisplay = null;

    return (
      <div className={styles.stages}>
        <div>
          <label className={addModalStyles.inputLabel}>{this.props.title}</label>
          <span className={classNames(styles.stageOptionWrapper, styles.stagesInput)}>
            <span className={styles.stagesOptions}>{stagesDisplay}</span>
            <ReactTooltip
              className={styles.keepTooltip}
              delayShow={150}
              delayHide={200}
              place={"bottom"}
              effect="solid"
            />
          </span>
        </div>
      </div>
    );
  }
}

SelectStageOnCreation.propTypes = {
  stages: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default SelectStageOnCreation;
