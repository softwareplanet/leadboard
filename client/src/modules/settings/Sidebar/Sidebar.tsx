import * as React from 'react'
import { CUSTOMIZE_FIELDS, PIPELINES } from '../settingsRoutes';
import * as styles from './Sidebar.css'

interface Props {
  param: string;
  history: any;
}

export default class Sidebar extends React.Component<Props, object> {
  private settingsMenu = [{
    value: 'Pipelines',
    param: PIPELINES,
  }, 
  {
    value: 'Customize fields',
    param: CUSTOMIZE_FIELDS,
  }];

  public render() {
    return (
      <aside className={styles.sidebar}>
        {this.getSettingsItems()}
      </aside>
    )
  }

  private getSettingsItems = () => {
    return (
      <ul>
        { this.settingsMenu.map(item => 
          ( 
            <li 
              key={item.value}
              className={this.props.param === item.param ? styles.itemActive : styles.item}
              onClick={() => this.props.history.push(`/settings/${item.param}`)}
            >
              { item.value }
            </li>
          )
        ) }
      </ul>
    )
  }
}
