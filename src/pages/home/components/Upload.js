import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";

import CreateIcon from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import useStyles from "./styles/uploadStyles";
import avatar from "../../../assets/avatar.jpg";

const Upload = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar alt="avatar" src={avatar} className={classes.avatar}/>
        <Typography className={classes.name}>Lãng Đế</Typography>
      </div>
      <div className={classes.content}>
          <div className={classes.button}>
              <CreateIcon className={classes.icon}/>
          </div>
          <div className={classes.button}>
              <AddAPhotoIcon className={classes.icon}/>
          </div>
      </div>
    </Paper>
  );
};

export default Upload;
