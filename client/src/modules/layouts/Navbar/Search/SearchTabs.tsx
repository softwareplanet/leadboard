import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ReactSVG from 'react-svg';
import leadIcon from '../../../../assets/lead-icon.svg';
import * as styles from './Search.css';

const ALL = 'All';
const LEAD = 'Lead';

interface Props extends RouteComponentProps<any> {
  value: string;
  onChange(e: any, tabValue: string): void;
}

export default class SearchTabs extends React.Component<Props> {

  public render() {
    return (
      <Tabs
        value={this.props.value}
        onChange={this.props.onChange}
        classes={{ scroller: styles.tabsRoot, flexContainer: styles.tabsContainer , indicator: styles.tabsIndicator }}
      >
        <Tab
          classes={{ root: styles.tab, label: styles.tabLabel, labelContainer: styles.labelContainer }}
          label={ALL}
          value={ALL}
        />
        <Tab
          value={LEAD}
          classes={ { root: styles.tab } }
          icon={<ReactSVG className={styles.leadTypeIcon} src={leadIcon} />}
        />
      </Tabs>
    )
  }
}
