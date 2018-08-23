import React from "react";
import ReactAutocomplete from "react-autocomplete";
import "../styles/Autocomplete.css";
import styles from "../styles/autocomplete-styles";

const COUNT_OF_DISPLAYED_ORGANIZATIONS = 4;

class OrganizationAutocomplete extends React.Component {
  render() {
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 && this.props.open}
        items={this.props.items}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderMenu={(items) =>
          items.length !== 0 ? (
            <div className="renderMenu" style={styles.organization.menu} children={items.splice(0, COUNT_OF_DISPLAYED_ORGANIZATIONS)} />
          ) : (
              <div className="renderMenu" style={styles.organization.menu}>
              {
                <div style={styles.organization.emptyMenuItem}>
                  { `"${this.props.value}" will be added as a new organization` }
                </div>
              }
            </div>
          )
        }
        renderItem={(item, highlighted) =>
          <div
            key={item._id}
            style={{
              ...styles.organization.menuItem,
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2"
            }}
          >
            {item.name}
          </div>
        }
        inputProps={{onBlur: this.props.onBlur, onFocus: this.props.onFocus}}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={(value, item) => this.props.onSelect(value, item)}
      />
    );
  }
}

export default OrganizationAutocomplete;