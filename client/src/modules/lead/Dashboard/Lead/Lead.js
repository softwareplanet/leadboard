import React from "react";
import { Link } from "react-router-dom";
import profile from "../../../../img/profile.svg";
import PropTypes from "prop-types";
import styles from "./Lead.css";


const lead = (props) => {
  let lead = props.lead;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Link className={styles.linkInfo} to={props.link}>
          <strong><img className={styles.avatar}
                       src={lead.owner && lead.owner.avatar ? lead.owner.avatar : profile} />
            {lead.name}
          </strong>
          <small>{lead.contact ? lead.contact.name : lead.organization.name}</small>
        </Link>
      </div>
    </div>
  );
};


lead.propTypes = {
  link: PropTypes.string.isRequired,
  lead: PropTypes.object.isRequired,
};
export default lead;
