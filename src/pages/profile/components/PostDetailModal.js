import { Avatar, Grid, Paper, TextField, Typography } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";

import useStyles from "./styles/postDetailModalStyles";

import {
  CommentService,
  LikeService,
  PostService,
} from "../../../services/services";

import TimeAgo from "react-timeago";
import Comment from "./Comment";
import {
  NavigateBefore,
  NavigateNext,
  Close,
  Send,
  FavoriteBorder,
  ModeCommentOutlined,
  Favorite,
} from "@material-ui/icons";

import Skeleton from "@material-ui/lab/Skeleton";

const PostDetailModal = ({ isShowing, modalRef, setIsShowing, postId }) => {
  const classes = useStyles();

  const inputRef = useRef(null);

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const username = localStorage.getItem("username");

  const handleComment = () => {
    if (comment === "") return;

    CommentService.comment(username, comment, postId).then((response) => {
      setComments((prevComments) => [...prevComments, response.data]);
    });
    setComment("");
  };

  const handleLike = () => {
    LikeService.like(username, postId).then((response) => {
      if (response.status === 400) {
        LikeService.dislike(username, postId).then((response) => {
          setPost({ ...post, likes: post.likes - 1, isLiked: false });
        });
      } else {
        setPost({ ...post, likes: post.likes + 1, isLiked: true });
      }
    });
  };

  const slideRight = () => {
    setIndex((index + 1) % gallery.length);
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(gallery.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (isShowing) {
      setIsLoading(true);
      PostService.getPostDetail(username, postId).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setPost(response.data);
          setGallery(response.data.postImages);
        }
      });

      CommentService.getComment(postId).then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
      });
    } else {
      setPost({});
      setGallery([]);
      setComments([]);
    }
  }, [isShowing, username, postId]);

  return isShowing ? (
    <div>
      <div className={classes.modalOverlay}></div>
      <Paper className={classes.root} ref={modalRef}>
        <Grid container spacing={0} className={classes.postContainer}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            style={{ position: "relative" }}
          >
            {gallery.length > 1 && (
              <NavigateBefore
                onClick={slideLeft}
                className={classes.slideIcon}
                style={{ left: 5 }}
              />
            )}
            {gallery.length > 1 && (
              <NavigateNext
                onClick={slideRight}
                className={classes.slideIcon}
                style={{ right: 5 }}
              />
            )}
            {gallery.length > 1 && gallery.length <= 6 && (
              <div
                className={classes.button}
                style={{ position: "absolute", bottom: 10, left: "50%" }}
              >
                {gallery.map((image, idx) => (
                  <span
                    key={idx}
                    className={classes.dot}
                    active={idx === index ? "1" : "0"}
                  ></span>
                ))}
              </div>
            )}
            {!isLoading ? (
              gallery.length <= 1 ? (
                <img
                  alt="postPhoto"
                  src={
                    post.postImages?.length > 0 ? post.postImages[0].url : null
                  }
                  className={classes.postImage}
                />
              ) : (
                <img
                  alt="postPhoto"
                  src={gallery[index].url}
                  className={classes.postImage}
                />
              )
            ) : (
              <Skeleton variant="rect" width="100%" height="610px"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            md={4}
            lg={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className={classes.postHeader}>
              {!isLoading ? (
                <Avatar
                  alt="postAvatar"
                  className={classes.postAvatar}
                  src={post.avatarUrl ? post.avatarUrl : null}
                />
              ) : (
                <Skeleton variant="circle">
                  <Avatar style={{ width: 30, height: 30 }} />
                </Skeleton>
              )}
              {!isLoading ? (
                <Typography variant="body1" className={classes.displayName}>
                  {post.displayName ? post.displayName : null}
                </Typography>
              ) : (
                <div style={{ marginLeft: 10, width: "100%" }}>
                  <Skeleton width="40%"></Skeleton>
                  <Skeleton width="30%"></Skeleton>
                </div>
              )}
            </div>
            {!isLoading ? (
              <div className={classes.postComment}>
                <div className={classes.comment}>
                  <Avatar
                    alt="postAvatar"
                    className={classes.postAvatar}
                    src={post.avatarUrl ? post.avatarUrl : null}
                  />
                  <div className={classes.commentSection}>
                    <div className={classes.commentInfo}>
                      <Typography
                        variant="body1"
                        className={classes.displayName}
                      >
                        {post.displayName ? post.displayName : null}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.commentText}
                      >
                        {post.content ? post.content : null}
                      </Typography>
                    </div>
                    <TimeAgo
                      date={post.dateCreate}
                      className={classes.commentDate}
                      title={null}
                      live={false}
                    />
                  </div>
                </div>
                {comments.length > 0 &&
                  comments.map((comment) => {
                    return <Comment comment={comment} key={comment.id} />;
                  })}
              </div>
            ) : (
              <div className={classes.postComment}></div>
            )}
            {!isLoading ? (
              <div className={classes.postInteractSection}>
                <div className={classes.interact}>
                  {post.isLiked ? (
                    <Favorite
                      className={classes.icon}
                      style={{ fontSize: 30, marginRight: 10 }}
                      onClick={handleLike}
                    />
                  ) : (
                    <FavoriteBorder
                      className={classes.icon}
                      style={{ fontSize: 30, marginRight: 10 }}
                      onClick={handleLike}
                    />
                  )}
                  <ModeCommentOutlined
                    className={classes.icon}
                    style={{ fontSize: 30 }}
                    onClick={() => {
                      console.log(inputRef);
                      inputRef.current.focus();
                    }}
                  />
                </div>
                <Typography variant="body1" className={classes.likeText}>
                  {post.likes
                    ? post.likes > 1
                      ? post.likes + " likes"
                      : post.likes + " like"
                    : "0 like"}
                </Typography>
                <TimeAgo
                  date={post.dateCreate}
                  className={classes.commentDate}
                  title={null}
                  live={false}
                />
              </div>
            ) : (
              <div style={{ flexGrow: 0.5, paddingLeft: 15 }}>
                <Skeleton width="60%"></Skeleton>
                <Skeleton width="80%"></Skeleton>
                <Skeleton width="40%"></Skeleton>
              </div>
            )}
            {!isLoading ? (
              <div className={classes.postCommentSection}>
                <TextField
                  multiline
                  rowsMax={4}
                  rows={1}
                  placeholder="Add a comment..."
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.input,
                    },
                  }}
                  inputRef={inputRef}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                />
                <Send className={classes.icon} onClick={handleComment} />
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  ) : null;
};

export default PostDetailModal;
