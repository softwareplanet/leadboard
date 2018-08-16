import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import InputField from "@material-ui/core/TextField";
const InputGroup = ({
                      name,
                      id,
                      placeholder,
                      label,
                      value,
                      error,
                      type,
                      onChange
                    }) => {
  return (
    <div className="input-group mb-3">
      <InputField
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        margin="normal"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;