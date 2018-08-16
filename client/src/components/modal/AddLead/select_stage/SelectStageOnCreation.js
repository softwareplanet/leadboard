import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./SelectStageOnCreation.css";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

class SelectStageOnCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stagesLoaded: false,
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
    const stagesDisplay = this.props.stages ? (
      this.props.stages.map((stage, index) => {
        if (index === 0) {
          return (
            <label
              key={stage._id}
              className={classNames(styles.radio, styles.active)}
              data-tip={stage.name}
              htmlFor={"stage-" + stage._id}
            >
              <input
                id={"stage-" + stage._id}
                type="radio"
                value={stage._id}
                defaultChecked={true}
                onClick={e => {
                  this.activateStageStyle(e);
                  this.props.onStageChange(stage._id);
                }}
              />
            </label>
          );
        }

        return (
          <label key={stage._id} className={styles.radio} data-tip={stage.name} htmlFor={"stage-" + stage._id}>
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
      })
    ) : (
      <span>You have not add any stages</span>
    );

    return (
      <div className={styles.stages}>
        <div>
          <label>Lead stage</label>
          <span className={classNames(styles.stageOptionWrapper, styles.stagesInput)}>
            <span className={styles.stagesOptions}>{stagesDisplay}</span>
            <ReactTooltip
              className={styles.keepTooltip}
              delayShow={150}
              delayHide={150}
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
  stages: PropTypes.array.isRequired
};

export default SelectStageOnCreation;
