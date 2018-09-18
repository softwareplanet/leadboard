import * as React from 'react';
import downArrowIcon from '../../../../assets/down-arrow.svg';
import pipelinesIcon from '../../../../assets/switch-pipeline.svg';
import ReactSVG from 'react-svg';
import checkMarkIcon from '../../../../assets/checkMark.svg';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as styles from './PipelineSwitcher.css';
import classNames from 'classnames';

interface State {
  isDropdownOpen: boolean;
  // funnels: any[];
}

interface Props {
  funnels: any;

  loadLeadboard(status: string): void;
}

class PipelineSwitcher extends React.Component<Props, State> {
  public state: State = {
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
            {/* <span>{this.getCurrentFunnelName()}</span> */}
            <span><ReactSVG className={styles.dropIcon} src={pipelinesIcon} /></span >
            <span className={styles.switchPipelineSpan}>Pipelines</span>
            <span><ReactSVG className={styles.dropIcon} src={downArrowIcon} /></span >
          </div>
        </DropdownToggle>
        <DropdownMenu className={styles.sitchMenu} tag={'div'}>
          <DropdownItem tag="div" className={classNames(styles.switchItem)} id="logout">
            <ReactSVG src={checkMarkIcon} className={styles.checkMarkIcon} />
            <span>Pipeline1</span>
          </DropdownItem>
          <DropdownItem tag="div" className={classNames(styles.switchItem)} id="settings">
            {/* <ReactSVG src={checkMarkIcon} className={styles.checkMarkIcon} /> */}
            <span>Pipeline2 </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  private toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };
}

export default PipelineSwitcher;

// const mapStateToProps = (state: any) => ({
//   funnels: state.funnels,
// });

// export default connect(
//   mapStateToProps,
//   { loadLeadboard },
// )(PipelineSwitcher);

