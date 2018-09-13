import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { CUSTOMIZE_FIELDS, PIPELINES } from '../settingsRoutes';
import * as styles from './Sidebar.css';

export default class Sidebar extends React.Component {
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
    return this.settingsMenu.map(item => 
      ( 
        <NavLink 
          key={item.value}
          activeClassName={styles.activeItem}
          className={styles.item}
          to={`/settings/${item.param}`}
        >
          { item.value }
        </NavLink>
      )
    ) 
  }
}
