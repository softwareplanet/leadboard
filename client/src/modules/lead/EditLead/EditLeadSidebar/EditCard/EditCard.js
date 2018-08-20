import React, { Component } from "react";
import styles from "./EditCard.css";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";
import personIcon from "../../../../../img/personIcon.svg";
import organizationIcon from "../../../../../img/organizationIcon.svg";

class EditCard extends Component {

  render() {
    let icon;
    if (this.props.title === "Person") {
      icon = personIcon;
    } else if (this.props.title === "Organization") {
      icon = organizationIcon;
    }
    let fields = this.props.value.custom.map((field) =>
      <CardField fieldValues={Object.values(field)} fieldName={Object.keys(field)} />);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>
            {this.props.title}
          </span>
        </div>
        <div className={styles.fields}>
          <MainField value={this.props.value} icon={icon} />
          {fields}
        </div>
      </div>
    )
  }
}

export default EditCard;