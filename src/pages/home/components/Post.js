import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendIcon from "@material-ui/icons/Send";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import useStyles from "./styles/postStyles";
import avatar from "../../../assets/avatar.png";

import LikeService from "../../../services/like.services";
import CommentService from "../../../services/comment.services";

const Post = ({ post }) => {
  const classes = useStyles();
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);

  let data = [];

  const handleLike = () => {
    const username = localStorage.getItem("username");

    LikeService.like(username, post.id).then((response) => {
      if (response.status === 400) {
        LikeService.dislike(username, post.id).then((response) =>
          setLikes(likes - 1)
        );
      } else {
        setLikes(likes + 1);
      }
    });
  };

  const handleComment = () => {
    if (comment === "") return;

    const username = localStorage.getItem("username");
    CommentService.comment(username, comment, post.id).then((response) =>
      console.log(response)
    );
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const slideRight = () => {
    setIndex((index + 1) % data.length);
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

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
      {data.length > 0 && data.length > 1 ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={slideLeft}
            className={classes.slideButton}
            style={{ left: 5 }}
          >
            <NavigateBeforeIcon />
          </button>
          <button
            onClick={slideRight}
            className={classes.slideButton}
            style={{ right: 5 }}
          >
            <NavigateNextIcon />
          </button>
          <img src={data[index]} alt={index} className={classes.previewImage} />
        </div>
      ) : (
        <img src={data} alt="previewImage" />
      )}
      <div className={classes.likeComment}>
        <div className={classes.button}>
          <FavoriteBorderIcon
            className={classes.icon}
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {likes === 0
              ? likes
              : likes > 1
              ? likes + " likes"
              : likes + " like"}
          </Typography>
        </div>
        <div className={classes.button} style={{ cursor: "pointer" }}>
          <ChatBubbleOutlineIcon className={classes.icon} />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {post.comments
              ? "0"
              : post.comments.length > 1
              ? post.comments.length + " comment"
              : post.comments.length + " comments"}
          </Typography>
        </div>
        {data.length > 1 && (
          <div
            className={classes.button}
            style={{ position: "absolute", right: 10 }}
          >
            {data.map((image, idx) => (
              <span
                key={image}
                className={classes.dot}
                active={idx === index ? "1" : "0"}
              ></span>
            ))}
          </div>
        )}
      </div>
      <div className={classes.comment}>
        <TextField
          className={classes.textField}
          placeholder="Write a comment..."
          multiline
          rows={2}
          rowsMax={4}
          onChange={handleChange}
        />
        <div className={classes.commentButton} onClick={handleComment}>
          <SendIcon className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Post;
