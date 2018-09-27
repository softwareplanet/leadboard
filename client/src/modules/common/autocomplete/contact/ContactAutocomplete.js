import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";
import { trim } from "lodash";

class ContactAutocomplete extends Component {
  input = React.createRef();

  inputFocus = () => {
    this.input.current.focus();
  };

  clearFunction = (e) => {
    if (e.keyCode === 27) {
      if (e.target.className === "contact-input") {
        this.props.onEsc();
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.clearFunction, false);
  }

  inputBlur = () => {
    this.input.current.blur();
  };

  render() {
    let open = this.props.value.length > 1 && this.props.open;
    const styles = this.props.styles;
    return (
      <ReactAutocomplete
        open={open}
        items={this.props.items}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(trim(value).toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderMenu={(items) =>
          items.length !== 0 ? (
            <div className="contactsList" style={styles.menu} children={items.splice(0, this.props.itemsCount)} />
          ) : (
            <div className="contactsList" style={styles.menu}>
              {
                <div style={styles.emptyMenuItem}>
                  { `"${this.props.value}" will be added as a new contact` }
                </div>
              }
            </div>
          )
        }
        renderItem={(item, highlighted) =>
          <div
            key={item._id}
            style={{
              ...styles.menuItem,
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2"
            }}
          >
            {item.organization !== undefined ? `${item.name} (${ item.organization.name })` : `${item.name}`}
          </div>
        }
        inputProps={{
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          className: "contact-input",
          style: this.props.inputStyle,
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
        ref={this.input}
      />
    );
  }
}

export default ContactAutocomplete;
