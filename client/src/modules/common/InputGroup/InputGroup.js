import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = ({
  formControl: {
    width: "98%"
  },
  cssLabel: {
    fontSize: "20px",
    color: "#A9A9A9",
    "&$cssFocused": {
      marginLeft: "0px",
      color: "#A9A9A9",
      fontSize: "20px"
    }
  },
  formHelper: {
    color: "red"
  },
  input: {
    height: "80px",
    fontSize: "20px",
    fontWeight: "500"
  },
  cssFocused: {}
});

const InputGroup = (props) => {
  return (
    <div className="input-group mb-3">
      <FormControl className={classnames(props.classes.input, props.classes.formControl)}>
        <InputLabel
          FormLabelClasses={{
            root: props.classes.cssLabel,
            focused: props.classes.cssFocused
          }}>
          {props.label}
        </InputLabel>
        <Input
          classes={{ underline: props.classes.input }}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}/>
        <FormHelperText
          classes={{ root: props.classes.formHelper }}>
          {props.error ? props.error : ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default withStyles(styles)(InputGroup);