import * as React from 'react';
import downArrowIcon from '../../../../assets/img/down-arrow.svg';
import pipelinesIcon from '../../../../assets/img/switch-pipeline.svg';
import ReactSVG from 'react-svg';
import checkMarkIcon from '../../../../assets/img/checkMark.svg';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as styles from './PipelineSwitcher.css';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Funnel from '../../../../models/Funnel';

interface State {
  isDropdownOpen: boolean;
}

interface Props extends RouteComponentProps<any> {
  funnels: Funnel[];

  setActiveFunnel(funnelId: string): void;
}

class PipelineSwitcher extends React.Component<Props, State> {
  public state = {
    isDropdownOpen: false,
  };

  public render() {
    const { isDropdownOpen } = this.state;
    return (
      <Dropdown
        className={styles.pipelineSwitcherWrapper}
        isOpen={isDropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          tag={'div'}
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={isDropdownOpen}
        >
          <div className={styles.switchButton}>
            <span><ReactSVG className={styles.dropIcon} src={pipelinesIcon} /></span >
            <span className={styles.switchPipelineSpan}>{this.getCurrentFunnelName()}</span>
            <span><ReactSVG className={styles.dropIcon} src={downArrowIcon} /></span >
          </div>
        </DropdownToggle>
        <DropdownMenu className={styles.sitchMenu} tag={'div'}>
          {this.renderPipelines()}
        </DropdownMenu>
      </Dropdown>
    );
  }

  private toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  private getCurrentFunnelName = () => {
    const activeFunnelName = this.props.funnels.find(funnel =>
      funnel._id === localStorage.getItem('activeFunnelId'));
    return activeFunnelName ? activeFunnelName.name : null;
  }

  private renderPipelines = () => {
    return this.props.funnels.map(funnel => (
      <DropdownItem
        tag="div"
        onClick={this.props.setActiveFunnel.bind(this, funnel._id)}
        className={classNames(styles.switchItem)}
        id="logout"
        key={funnel._id}
      >
        {funnel._id === this.props.match.params.funnelId ?
          <ReactSVG src={checkMarkIcon} className={styles.checkMarkIcon} /> :
          null
        }
        <span>{funnel.name}</span>
      </DropdownItem>
    ),
    );
  }
}

export default withRouter(PipelineSwitcher);
