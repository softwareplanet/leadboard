import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SelectStageOnCreation.css";
import addModalStyles from "../../../../styles/addingModal.css";
import ReactTooltip from "react-tooltip";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class SelectStageOnCreation extends Component {

  componentDidMount() {
    if (this.props.stages) {
      this.props.onStageChange(this.props.stageId ? this.props.stageId : this.props.stages[0]._id);
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
        let active = this.props.stageId ? (stage._id === this.props.stageId) : (index === 0);
        return (
          <label key={stage._id} className={cx({ radio: true, active })} data-tip={stage.name}>
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
  title: PropTypes.string.isRequired,
  stageId: PropTypes.string,
};

export default SelectStageOnCreation;
