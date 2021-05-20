import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import useStyle from "./styles/postStyles";
import avatar from "../../../assets/avatar.jpg";

const Post = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar alt="avatar" src={avatar} className={classes.avatar} />
        <Typography className={classes.name}>Lãng Đế</Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris
        </Typography>
      </div>
      <div>
        <img src={avatar} alt="postImage" className={classes.image} />
      </div>
      <div className={classes.likeComment}>
        <div className={classes.button}>
          <FavoriteBorderIcon
            className={classes.icon}
            style={{ cursor: "pointer" }}
          />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            6 likes
          </Typography>
        </div>
        <div className={classes.button} style={{ cursor: "pointer" }}>
          <ChatBubbleOutlineIcon className={classes.icon} />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            6 comments
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
