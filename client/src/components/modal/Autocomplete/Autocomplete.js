import React from "react";
import ReactAutocomplete from "react-autocomplete";
import "./Autocomplete.css";

class Autocomplete extends React.Component {
  render() {
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 && this.props.open}
        selectOnBlur={true}
        items={this.props.items}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderMenu={(items) =>
          items.length !== 0 ? (
            <div style={{
              position: "absolute",
              top: 180,
              left: 15,
              zIndex: 7000,
              width: "318px",
              backgroundColor: "white",
              color: "#317ae2",
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              padding: "5px 0"
            }} children={items.splice(0, 4)} />
          ) : (
            <div style={{
              position: "absolute",
              top: 180,
              left: 15,
              zIndex: 7000,
              width: "318px",
              backgroundColor: "white",
              color: "#317ae2",
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              padding: "5px 0"
            }}>
              {
                <div
                  style={{
                    backgroundColor: "transparent",
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "normal",
                    padding: "2px 5px"
                  }}
                >
                  { `"${this.props.value}" will be added as a new organization` }
                </div>
              }
            </div>
          )
        }
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2",
              fontSize: "12px",
              fontWeight: "normal",
              padding: "2px 5px",
              cursor: "pointer"
            }}
          >
            {item.label}
          </div>
        }
        inputProps={{onBlur: this.props.onBlur}}
        value={this.props.value}
        onChange={e => this.props.onChange(e)}
        onSelect={val => this.props.onSelect(val)}
      />
    );
  }
}

export default Autocomplete;