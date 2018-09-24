import classNames from 'classnames';
import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import checkMarkIcon from '../../../../assets/img/checkMark.svg';
import downArrowIcon from '../../../../assets/img/down-arrow.svg';
import settingsIcon from '../../../../assets/img/settings-icon.svg';
import pipelinesIcon from '../../../../assets/img/switch-pipeline.svg';
import Funnel from '../../../../models/Funnel';
import * as styles from './PipelineSwitcher.css';

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
    return this.props.funnels.length === 1 ?
      this.renderSettingsButton() :
      this.renderDropdown();
  }

  private toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  private getCurrentFunnelName = () => {
    const activeFunnelName = this.props.funnels.find(funnel =>
      funnel._id === this.props.match.params.funnelId);
    return activeFunnelName ? activeFunnelName.name : null;
  }

  private renderSettingsButton = () => {
    return (
      <div className={styles.settingsButton}>
        <NavLink
          to={'/settings/pipelines'}>
          <ReactSVG src={settingsIcon} className={styles.dropIcon} />
          <span>Pipelines settings</span>
        </NavLink>
      </div>
    );
  }

  private renderDropdown = () => {
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
          <DropdownItem divider={true} />
          <NavLink
            className={styles.settingsLink}
            to={'/settings/pipelines'}>
            <DropdownItem
              tag="div"
              // onClick={this.props.history.push}
              className={classNames(styles.switchItem)}
            >
              <ReactSVG src={settingsIcon} className={styles.settingsIcon} />
              <span>Pipelines settings</span>
            </DropdownItem>
          </NavLink>
        </DropdownMenu>
      </Dropdown>
    );
  }

  private renderPipelines = () => {
    return this.props.funnels.map(funnel => (
      <DropdownItem
        tag="div"
        onClick={this.props.setActiveFunnel.bind(this, funnel._id)}
        className={classNames(styles.switchItem)}
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
