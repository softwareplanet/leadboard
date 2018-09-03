import React from "react";
import ReactAutocomplete from "react-autocomplete";
import { trim } from "lodash";

class OrganizationAutocomplete extends React.Component {
  state = {
    isOpen: false,
  }

  input = React.createRef();

  inputFocus = () => {
    this.input.current.focus();
  };

  closeOnEsc = (isOpen) => {
    this.setState({ isOpen });
  }

  clearFunction = (e) => {
    if (e.keyCode === 27) {
      if (e.target.className === 'organization-input') {
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
    const styles = this.props.styles;
    let open = this.state.isOpen && (this.props.value.length > 1 && this.props.open);
    return (
      <ReactAutocomplete
        open={open}
        onMenuVisibilityChange={(isOpen) => this.closeOnEsc(isOpen)}
        items={this.props.items}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(trim(value).toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderMenu={(items) =>
          items.length !== 0 ? (
            <div className="organizationsList" style={styles.menu} children={items.splice(0, this.props.itemsCount)} />
          ) : (
              <div className="organizationsList" style={styles.menu}>
                {
                  <div style={styles.emptyMenuItem}>
                    {`"${this.props.value}" will be added as a new organization`}
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
            {item.name}
          </div>
        }
        inputProps={{
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          className: "organization-input",
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

export default OrganizationAutocomplete;