import { Avatar, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";

import CreateIcon from "@material-ui/icons/Create";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import useStyles from "./styles/uploadStyles";
import useModal from "../../../hooks/useModal";

import Modal from "../../../components/Modal";

const Upload = ({ displayName, avatar }) => {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        toggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, toggle]);

  return (
    <Paper className={classes.root}>
      <Modal isShowing={isShowing} hide={toggle} propRef={wrapperRef} displayName={displayName} avatar={avatar}/>
      <div className={classes.avatarContainer}>
        <Avatar alt="avatar" src={avatar} className={classes.avatar} />
        <Typography className={classes.name}>{displayName}</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.button} onClick={toggle}>
          <CreateIcon className={classes.icon} />
        </div>
        <div className={classes.button}>
          <AddAPhotoIcon className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Upload;
