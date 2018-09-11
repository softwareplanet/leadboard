import * as React from 'react'
import * as styles from './Sidebar.css'

interface State {
  activeIndex: number
}

export default class Sidebar extends React.Component<object, State> {
  public state: State = {
    activeIndex: 0,
  }
  private settingsElements = ['Pipelines', 'Customize fields'];

  public render() {
    return (
      <aside className={styles.sidebar}>
        {this.getSettingsItems()}
      </aside>
    )
  }

  private select = (index: number) => {
    this.setState({
      activeIndex: index,
    })
  }

  private getSettingsItems = () => {
    return (
      <ul>
        { this.settingsElements.map((item, index) => 
          ( 
            <li 
              key={index}
              className={this.state.activeIndex === index ? styles.itemActive : styles.item}
              onClick={() => this.select(index)}
            >
              { item }
            </li>
          )
        ) }
      </ul>
    )
  }
}
