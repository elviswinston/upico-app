import { Avatar, Paper, Typography } from "@material-ui/core";

import React from "react";

import useStyles from "./styles/modalStyles";

import UserService from "../../../services/user.services";

const UnfollowModal = ({
  avatar,
  isShowing,
  modalRef,
  setIsShowing,
  username,
}) => {
  const classes = useStyles();

  const handleClick = () => {};

  return isShowing ? (
    <div>
      <div className={classes.modalOverlay}></div>
      <Paper className={classes.root} ref={modalRef}>
        <div className={classes.avatarContainer}>
          <Avatar src={avatar} alt="avatar" className={classes.avatar} />
        </div>
        <div className={classes.textContainer}>
          <Typography variant="body1" className={classes.text}>
            If you change your mind, you will have to request a follow-up to
            {" @" + username}
          </Typography>
        </div>
        <div
          className={classes.option}
          style={{ fontWeight: "bold", color: "#ed4956" }}
          onClick={handleClick}
        >
          Unfollow
        </div>
        <div className={classes.option} onClick={() => setIsShowing(false)}>
          Cancel
        </div>
      </Paper>
    </div>
  ) : null;
};

export default UnfollowModal;
