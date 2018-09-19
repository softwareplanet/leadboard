import * as React from 'react';
import { Card, CardBody, CardFooter, Popover, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Funnel from '../../../../../models/Funnel';
import * as styles from '../popover.css';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import { FullStage } from '../../../../../models/Stage';

interface Props {
  isOpen: boolean;
  funnels: Funnel[];
  target: string;
  stage: FullStage;

  toggle(): void;
}

interface State {
  selectedFunnel: Funnel;
  isDropdownOpen: boolean;
}

export default class EditLeadPipelinePopover extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
    selectedFunnel: this.props.stage.funnel,
  };

  public render() {
    return (
      <Popover
        className={styles.pipelinePopover}
        placement="bottom-start"
        isOpen={this.props.isOpen}
        target={this.props.target}
        toggle={this.props.toggle}
      >
        <Card>
          <div className={styles.header}>Pipelines</div>
          <CardBody className={styles.pipelineContainer}>
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
    });
  }

  private toggleDropdown = () => {
    this.setState((prevState: State) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  }
}
