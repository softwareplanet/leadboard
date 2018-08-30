import style from "./CustomSelect.css"
import React, { Component } from "react";


export default class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    }
  }

  onFocus = () => {
    this.setState(prevState => {
      if(!prevState.isOpened) {
        return {isOpened : true}
      }
      return prevState;
    })
  };

  onBlur = () => {
    this.setState({isOpened: false})
  };

  onSelect = value => {
    this.setState({isOpened: false});
    this.props.onSelect(value)
  };

  renderOptions = () => {
    return this.props.options.map(option =>
      <li
        className={style.option}
        onMouseDown={() => this.onSelect(option.value)}>
        {option.text}
      </li>)
  };

  getInputProps =() => {
    let propsCopy = {...this.props};
    delete propsCopy.onSelect;
    delete propsCopy.options;
    return propsCopy;
  };

  render() {
    return(
      <div>
        <input {...this.getInputProps()} onFocus={this.onFocus} onBlurCapture={this.onBlur} className={this.props.className} type="text" />
        <ul className={this.state.isOpened ? style.itemsList : style.closed}>
          {this.renderOptions()}
        </ul>
      </div>
    )
  }

};