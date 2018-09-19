import * as React from 'react';
import { Popover } from 'reactstrap';
import { Funnel } from '../../../../settings/Funnels/Funnel/Funnel';

interface Props {
  isOpen: boolean;
  funnels: Funnel[];
  target: string;
  toggle(): void;
}

interface State {
  selectedFunnel: Funnel;
}

export default class EditLeadPipelinePopover extends React.Component<Props, State> {

  public render() {
    return (
      <Popover
        isOpen={this.props.isOpen}
        target={this.props.target}
        toggle={this.props.toggle}
      >
        <div>popover</div>
      </Popover>
    );
  }
}
