import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  NavigateNext,
  NavigateBefore,
  Send,
} from "@material-ui/icons";

import useStyles from "./styles/postStyles";

import avatar from "../../../assets/avatar.png";

import { CommentService, LikeService } from "../../../services/services";

import Comment from "./Comment";

const Post = ({ post }) => {
  const classes = useStyles();
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [index, setIndex] = useState(0);

  let data = [];
  const postId = post.id;
  const username = localStorage.getItem("username");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleLike = () => {
    LikeService.like(username, postId).then((response) => {
      if (response.status === 400) {
        LikeService.dislike(username, postId).then((response) => {
          setLikes(likes - 1);
          setIsLiked(false);
        });
      } else {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    });
  };

  const handleComment = () => {
    if (comment === "") return;

    CommentService.comment(username, comment, postId).then((response) => {
      setComments((prevComments) => [...prevComments, response.data]);
    });
    setComment("");
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

  useEffect(() => {
    CommentService.getComment(postId).then((response) => {
      setComments(response.data);
    });
  }, [postId]);

  return (
    <Paper className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar
          alt="avatar"
          src={post.avatarUrl ? post.avatarUrl : avatar}
          className={classes.avatar}
          onClick={() => {
            window.location.href = window.location.origin + "/" + post.username;
          }}
        />
        <a
          href={"/" + post.username}
          style={{ textDecoration: "none" }}
          className={classes.name}
        >
          {post.displayName}
        </a>
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.text}>
          {post.content}
        </Typography>
      </div>
      {data.length > 0 ? (
        data.length > 1 ? (
          <div style={{ position: "relative" }}>
            <NavigateBefore
              onClick={slideLeft}
              className={classes.slide}
              style={{ left: 0 }}
            />
            <NavigateNext
              onClick={slideRight}
              className={classes.slide}
              style={{ right: 5 }}
            />
            <img
              src={data[index]}
              alt={index}
              className={classes.previewImage}
            />
          </div>
        ) : (
          <img src={data} alt="previewImage" />
        )
      ) : null}
      <div className={classes.likeComment}>
        <div className={classes.button}>
          {isLiked ? (
            <Favorite
              className={classes.icon}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorder
              className={classes.icon}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {likes === 0
              ? likes
              : likes > 1
              ? likes + " likes"
              : likes + " like"}
          </Typography>
        </div>
        <div className={classes.button} style={{ cursor: "pointer" }}>
          <ChatBubbleOutline className={classes.icon} />
          <Typography style={{ color: "#2a3f54", fontWeight: "bold" }}>
            {post.comments
              ? "0"
              : post.comments.length > 1
              ? post.comments.length + " comment"
              : post.comments.length + " comments"}
          </Typography>
        </div>
        {data.length > 1 && data.length <= 6 && (
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
      <div style={{ marginTop: 10 }}>
        {comments.length > 0 &&
          comments.map((comment) => {
            return <Comment comment={comment} key={comment.id} />;
          })}
      </div>
      <div className={classes.comment}>
        <TextField
          className={classes.textField}
          placeholder="Write a comment..."
          multiline
          rows={2}
          rowsMax={4}
          onChange={handleChange}
          value={comment}
        />
        <div className={classes.commentButton} onClick={handleComment}>
          <Send className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Post;
