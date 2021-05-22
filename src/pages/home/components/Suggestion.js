import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import useStyles from "./styles/suggestionStyles";
import avatar from "../../../assets/avatar.jpg";

const Suggestion = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.headerText}>
          Suggestions for you
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.suggest}>
          <Avatar alt="avatar" src={avatar} className={classes.avatar} />
          <div className={classes.info}>
            <Typography className={classes.name}>Vinh Lê Khánh</Typography>
            <Typography className={classes.desc}>
              Tiểu lý quảng Hoa Vinh
            </Typography>
          </div>
          <FavoriteBorderIcon className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Suggestion;
