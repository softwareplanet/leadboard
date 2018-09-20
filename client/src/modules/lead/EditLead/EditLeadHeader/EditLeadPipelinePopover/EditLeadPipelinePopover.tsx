import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, Dropdown, DropdownMenu, DropdownToggle, Popover } from 'reactstrap';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import Funnel from '../../../../../models/Funnel';
import { FullStage } from '../../../../../models/Stage';
import { loadPipelinePopoverStages } from '../../../leadActions';
import * as styles from '../popover.css';
import SelectStageOnCreation from '../../../AddLead/SelectStage/SelectStageOnCreation';

interface Props {
  isOpen: boolean;
  funnels: Funnel[];
  target: string;
  stage: FullStage;
  stages: FullStage[];

  toggle(): void;

  loadPipelinePopoverStages(funnelId: string): void;

}

interface State {
  selectedFunnel: Funnel;
  selectedStageId: string;
  isDropdownOpen: boolean;
}

class EditLeadPipelinePopover extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
    selectedFunnel: this.props.stage.funnel,
    selectedStageId: this.props.stage._id  ,
  };

  public render() {
    return (
      <Popover
        className={styles.pipelinePopover}
        placement="bottom-start"
        isOpen={this.props.isOpen}
        target={this.props.target}
        toggle={this.togglePopover}
      >
        <Card>
          <CardBody className={styles.pipelineContainer}>
            <div className={styles.pipelineHeader}>Pipeline</div>
            <div className={styles.inputContainer}>
              <Dropdown
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle className={styles.select}>
                  {this.state.selectedFunnel.name}
                </DropdownToggle>
                {this.renderSelectOptions()}
              </Dropdown>
            </div>
            <SelectStageOnCreation 
              stages={this.props.stages} 
              onStageChange={this.onStageSelect}
              title="Pipeline's stages"
            />
          </CardBody>
          <CardFooter className={styles.buttons}>
            <button className={styles.buttonSave}>
              Save
            </button>
            <button className={styles.button}>
              Cancel
            </button>
          </CardFooter>
        </Card>
      </Popover>
    );
  }

  public componentWillMount() {
    this.props.loadPipelinePopoverStages(this.props.stage.funnel._id);
  }

  private renderSelectOptions() {
    return (
      <DropdownMenu>
        {this.props.funnels.map((funnel: Funnel) => {
        return (
          <DropdownItem className={styles.option} onClick={this.onFunnelSelect.bind(this, funnel)} key={funnel._id}>
            {funnel.name}
          </DropdownItem>
        );
        })}
      </DropdownMenu>
    );
  }

  private onFunnelSelect(funnel: Funnel) {
    this.setState({
      selectedFunnel: funnel,
    }, () => {
      this.props.loadPipelinePopoverStages(this.state.selectedFunnel._id);
    });
  }

  private onStageSelect = (stageId: string) => {
    this.setState({
      selectedStageId: stageId,
    });
  }

  private toggleDropdown = () => {
    this.setState((prevState: State) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  }

  private togglePopover = () => {
    this.setState({  
      isDropdownOpen: false,
      selectedFunnel: this.props.stage.funnel,
      selectedStageId: this.props.stage._id,
    }, () => {
      this.props.loadPipelinePopoverStages(this.state.selectedFunnel._id);
      this.props.toggle();
    });
  }
}

const mapStateToProps = (state: any) => ({
  funnels: state.leads.funnels,
  stage: state.leads.editLead.lead.stage,
  stages: state.leads.editLead.stagesForFunnel,
});

export default connect(mapStateToProps, { loadPipelinePopoverStages })(EditLeadPipelinePopover);
