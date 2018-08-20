import React from "react";
import ReactAutocomplete from "react-autocomplete";
import "./styles/Autocomplete.css";
import styles from "./styles/autocomplete-styles";

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
            <div style={styles.menu} children={items.splice(0, 4)} />
          ) : (
              <div style={styles.menu}>
              {
                <div style={styles.emptyMenuItem}>
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
              ...styles.menuItem,
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2"
            }}
          >
            {item.name}
          </div>
        }
        inputProps={{onBlur: this.props.onBlur}}
        value={this.props.value}
        onChange={e => this.props.onChange(e)}
        onSelect={(value, item) => this.props.onSelect(value, item._id)}
      />
    );
  }
}

export default OrganizationAutocomplete;