import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import CustomizeFields from './CustomizeFields/CustomizeFields';
import Pipelines from './Pipelines/Pipelines';
import * as styles from './Settings.css'
import { CUSTOMIZE_FIELDS, PIPELINES } from './settingsRoutes';
import Sidebar from './Sidebar/Sidebar';

export default class Settings extends React.Component<RouteComponentProps<{menuItem: string}>> {

  public render() {
    return (
      <div className={styles.settings}>
        <Sidebar history={this.props.history} param={this.props.match.params.menuItem}/>
        { this.getSettingsContent() }
      </div>
    )
  }

  private getSettingsContent() {
    switch (this.props.match.params.menuItem) {
      case PIPELINES:
        return <Pipelines />
      case CUSTOMIZE_FIELDS:
        return <CustomizeFields />
      default: 
        return <Pipelines />
    }
  }
}
