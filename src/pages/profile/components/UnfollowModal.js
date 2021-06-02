import { Avatar, Paper, Typography } from "@material-ui/core";

import React from "react";

import useStyles from "./styles/unfollowModalStyles";
import useLoading from "../../../hooks/useLoading";

import { UserService } from "../../../services/services";

const UnfollowModal = ({
  avatar,
  isShowing,
  modalRef,
  toggleModal,
  sourceUsername,
  targetUsername,
  setUser,
}) => {
  const classes = useStyles();

  const { onLoading, offLoading } = useLoading();

  const handleClick = () => {
    onLoading();
    toggleModal();
    UserService.unfollow(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setUser((prevUser) => {
          return {
            ...prevUser,
            isFollowed: false,
            followers: prevUser.followers - 1,
          };
        });
        offLoading();
      }
    });
  };

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
            {" @" + targetUsername}
          </Typography>
        </div>
        <div
          className={classes.option}
          style={{ fontWeight: "bold", color: "#ed4956" }}
          onClick={handleClick}
        >
          Unfollow
        </div>
        <div className={classes.option} onClick={() => toggleModal(false)}>
          Cancel
        </div>
      </Paper>
    </div>
  ) : null;
};

export default UnfollowModal;
