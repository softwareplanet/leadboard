import * as React from 'react';
import { Card, CardBody, CardFooter, Popover } from 'reactstrap';
import Funnel from '../../../../../models/Funnel';
import * as styles from '../popover.css';

interface Props {
  isOpen: boolean;
  funnels: Funnel[];
  target: string;
  toggle(): void;
}

interface State {
  selectedFunnel: string;
}

export default class EditLeadPipelinePopover extends React.Component<Props, State> {
  public state: State = {
    selectedFunnel: '',
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
              <select
                className={styles.input} 
                value={this.state.selectedFunnel} onChange={this.onFunnelSelect}>
                {this.renderSelectOptions()}
              </select>
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
    return this.props.funnels.map((funnel: Funnel) => {
      return (
        <option value={funnel._id} key={funnel._id}>
          {funnel.name}
        </option>
      );
    });
  }

  private onFunnelSelect = (e: any) => {
    this.setState({
      selectedFunnel: e.target.value,
    });
  }
}
