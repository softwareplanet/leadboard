import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, Dropdown, DropdownMenu, DropdownToggle, Popover } from 'reactstrap';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import Funnel from '../../../../../models/Funnel';
import { FullLead } from '../../../../../models/Lead';
import { FullStage } from '../../../../../models/Stage';
import SelectStageOnCreation from '../../../AddLead/SelectStage/SelectStageOnCreation';
import { loadPipelinePopoverStages, updateLead } from '../../../leadActions';
import * as styles from '../popover.css';

const NO_STAGES_ERROR_MESSAGE = 'There is no stages on selected pipeline';

interface Props {
  isOpen: boolean;
  funnels: Funnel[];
  target: string;
  lead: FullLead;
  stages: FullStage[];

  toggle(): void;

  loadPipelinePopoverStages(funnelId: string): void;

  updateLead (lead: any): void;
}

interface State {
  selectedFunnel: Funnel;
  selectedStageId: string;
  isDropdownOpen: boolean;
  errorMessage: string;
}

class EditLeadPipelinePopover extends React.Component<Props, State> {

  public getInitialState = (): State => ({
    errorMessage: '',
    isDropdownOpen: false,
    selectedFunnel: this.props.lead.stage.funnel,
    selectedStageId: this.props.lead.stage._id,
  })

  public state: State = this.getInitialState();

  public render() {
    const error = !!this.state.errorMessage;
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
                {this.renderDropdownOptions()}
                <p className={styles.errorMessage}>{this.state.errorMessage}</p>
              </Dropdown>
            </div>
            <SelectStageOnCreation 
              stages={this.props.stages} 
              onStageChange={this.handleStageSelect}
              title="Pipeline's stages"
              stageId={this.state.selectedStageId}
            />
          </CardBody>
          <CardFooter className={styles.buttons}>
            <button
              onClick={this.onSave}
              className={error ? styles.disabledButton : styles.buttonSave}
              disabled={error}
            >
              Save
            </button>
            <button className={styles.button} onClick={this.togglePopover}>
              Cancel
            </button>
          </CardFooter>
        </Card>
      </Popover>
    );
  }

  public componentWillMount() {
    this.props.loadPipelinePopoverStages(this.props.lead.stage.funnel._id);    
    this.setState({
      selectedFunnel: this.props.lead.stage.funnel,
      selectedStageId: this.props.lead.stage._id,
    });
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.validateStages(nextProps.stages);

    if (this.isFunnelChangedAndStagesLoaded(nextProps)) {
      this.setState({
        selectedStageId: nextProps.stages[0]._id,
      });
    }

    if (this.isFunnelChangedNotByClick(nextProps)) {
      this.handleFunnelSelect(nextProps.lead.stage.funnel);
    }
  }

  private isFunnelChangedAndStagesLoaded (props: Props): boolean {
    return this.props.stages !== props.stages && props.stages.length !== 0;
  }

  private isFunnelChangedNotByClick(props: Props): boolean {
    return this.props.stages === props.stages &&
    this.state.selectedFunnel._id !== props.lead.stage.funnel._id;
  }

  private renderDropdownOptions() {
    return (
      <DropdownMenu>
        {this.props.funnels.map((funnel: Funnel) => (
          <DropdownItem
            className={styles.option}
            onClick={this.handleFunnelSelect.bind(this, funnel)}
            key={funnel._id}
          >
            {funnel.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  }

  private validateStages(stages: FullStage[]){
    if (stages.length > 0){
      this.setState({
        errorMessage: '',
      });
    }else{
      this.setState({
        errorMessage: NO_STAGES_ERROR_MESSAGE,
      });
    }
  }

  private handleFunnelSelect(funnel: Funnel) {
    this.setState({
      selectedFunnel: funnel,
    }, () => {
      this.props.loadPipelinePopoverStages(this.state.selectedFunnel._id);
    });
  }

  private handleStageSelect = (stageId: string) => {
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
    this.setState(this.getInitialState(), () => {
      this.props.loadPipelinePopoverStages(this.state.selectedFunnel._id);
      this.props.toggle();
    });

  }

  private onSave = () => {
    this.props.updateLead( { _id: this.props.lead._id, stage: this.state.selectedStageId } );
    this.togglePopover();
  }
}

const mapStateToProps = (state: any) => ({
  funnels: state.dashboard.funnels,
  lead: state.dashboard.editLead.lead,
  stages: state.dashboard.editLead.stagesForFunnel,
});

export default connect(mapStateToProps, { loadPipelinePopoverStages, updateLead })(EditLeadPipelinePopover);
