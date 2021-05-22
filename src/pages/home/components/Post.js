import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import useStyle from "./styles/postStyles";
import avatar from "../../../assets/avatar.png";

import ReactPhotoGrid from "react-photo-grid";

const Post = ({ post }) => {
  const classes = useStyle();
  let data = [];

  if (post.postImages.length > 0) {
    post.postImages.map((image) => (data = [...data, image.url]));
  }
  return (
    <Paper className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar
          alt="avatar"
          src={post.avatarUrl ? post.avatarUrl : avatar}
          className={classes.avatar}
        />
        <Typography className={classes.name}>{post.displayName}</Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.text}>
          {post.content}
        </Typography>
      </div>
      {data.length > 0 && <ReactPhotoGrid data={data} gridSize="400x400" />}
      <div className={classes.likeComment}>
        <div className={classes.button}>
          <FavoriteBorderIcon
            className={classes.icon}
            style={{ cursor: "pointer" }}
          />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {post.likes === 0 ? post.likes : post.likes + "likes"}
          </Typography>
        </div>
        <div className={classes.button} style={{ cursor: "pointer" }}>
          <ChatBubbleOutlineIcon className={classes.icon} />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {post.comments ? "0" : post.comments.length + "comments"}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
