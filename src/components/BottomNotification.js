import React from "react";

import useStyles from "./styles/bottomNotificationStyles";

const BottomNotification = ({ error }) => {
  const classes = useStyles();

  let valid = false;

  if (error.confirm !== "") {
    valid = true;
    document.body.style.overflow = "hidden";
  }

  if (error.password !== "") {
    valid = true;
    document.body.style.overflow = "hidden";
  }

  if (error.old !== "") {
    valid = true;
    document.body.style.overflow = "hidden";
  }

  return (
    <div className={classes.root} active={valid ? 1 : 0}>
      {error.confirm !== ""
        ? error.confirm
        : error.password !== ""
        ? error.password
        : null}
      {error.old !== "" ? error.old : null}
    </div>
  );
};

export default BottomNotification;
