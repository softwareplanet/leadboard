import React from "react";
import ReactAutocomplete from "react-autocomplete";

const COUNT_OF_DISPLAYED_ORGANIZATIONS = 4;

class ContactAutocomplete extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 && this.props.open}
        items={this.props.items}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderMenu={(items) =>
          items.length !== 0 ? (
            <div className="contactsList" style={styles.menu} children={items.splice(0, COUNT_OF_DISPLAYED_ORGANIZATIONS)} />
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
      />
    );
  }
}

export default ContactAutocomplete;