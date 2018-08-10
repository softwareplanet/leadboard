import React, { Component } from "react";
import PropTypes from "prop-types";
import { loadStages } from "../../../actions/leadActions";
import { connect } from "react-redux";
import "./SelectStage.css";
import ReactTooltip from 'react-tooltip'

class SelectStageOnCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: [ { _id: 1, name: "sdgsdg" }, { _id: 2, name: "sdgds" }, { _id: 3, name: "sdg" },{ _id: 4, name: "sdg" },{ _id: 5, name: "sdg" } ]
    };

    this.stagesLoaded = false;
  }

  componentDidMount() {
    if (this.props.auth.domainid && this.props.stages) {
      this.stagesLoaded = true;
    }
  }

  activateStageStyle = (e) => {
    e.preventDefault()
    e.target.parentNode.parentNode.childNodes.forEach(childNode=>{
      if(childNode.className.toString().includes('active')){
        childNode.className = childNode.className.toString().replace(' active', '')
      }
    });
    e.target.parentNode.className += ' active';
  };


  render() {
    const stagesDisplay = this.props.stages ? this.props.stages.map((stage,index) => {
      if (index === 0){
        return (<label key={stage._id}
                       className="AppLead__radio active"
                       data-tip={stage.name}
                       htmlFor={"stage-" + stage._id}>
          <input id={"stage-" + stage._id}
                 type="radio"
                 value={stage._id}
                 // checked={this.props.selectedStage.name === stage.name}
                 defaultChecked={true}
                 onClick={(e) => {
                   this.activateStageStyle(e);
                   this.props.onStageChange(stage);
                 }}/>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </label>)
      }

      return ( <label key={stage._id}
                      className="AppLead__radio to"
                      data-tip={stage.name}
                      htmlFor={"stage-" + stage._id}>
        <input id={"stage-" + stage._id}
               type="radio"
               data-title={stage.name}
               value={stage._id}
               checked={this.props.selectedStage.name === stage.name}
               onClick={(e) => {
                 this.activateStageStyle(e);
                 this.props.onStageChange(stage);
               }}/>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </label>
      );
    }): <span>You have not add any stages</span>;

    // console.log(this.props.leads.stages);
    return ( <div className="stages">
        <div className="field">
          <label  className="AppLead__input-label">
            Lead stage
          </label>
          <span className="AppLead__stage-option-wrapper AppLead__stages-input">
            <span className="AppLead__stages_options">
              {stagesDisplay}
            </span>
          </span>
        </div>
        <label htmlFor={"stage-" + this.props.selectedStage._id} className="AppLead__input-label">
          {this.props.selectedStage.name}
        </label>

      </div>
    );
  };
}

SelectStageOnCreation.propTypes = {
  leads: PropTypes.object.isRequired
};
const mapStateToProps = state => ( {
  leads: state.leads,
  auth: state.auth
} );

export default connect(
  mapStateToProps,
  { loadStages }
)(SelectStageOnCreation);
