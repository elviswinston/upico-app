import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import useStyles from "./styles/commentStyles";
import avatar from "../../../assets/avatar.png";

import TimeAgo from "react-timeago";

import CommentService from "../../../services/comment.services";

const Comment = ({ comment }) => {
  const classes = useStyles();

  const [isReplying, setIsReplying] = useState(false);
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [replies, setReplies] = useState(comment.childs);
  const [text, setText] = useState("Show replies");

  const handleClick = () => {
    setIsReplying(!isReplying);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const username = localStorage.getItem("username");
      const content = e.target.value;
      const parentId = e.target.id;
      CommentService.replyComment(username, content, parentId).then(
        (response) => {
          if (response.status === 200) {
            setReplies([...replies, response.data]);
          }
        }
      );
    }
  };

  const showReply = () => {
    setIsShowingReply(!isShowingReply);
    isShowingReply ? setText("Show replies") : setText("Hide replies");
  };

  return (
    <div>
      <div className={classes.comment}>
        <Avatar
          alt="avatar"
          src={comment.userAvatarUrl ? comment.userAvatarUrl : avatar}
          className={classes.avatar}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <Typography varian="body1" className={classes.displayName}>
              {comment.userDisplayName}
            </Typography>
            <Typography varian="body1" style={{ fontSize: 14 }}>
              {comment.content}
            </Typography>
          </div>
          <div>
            <TimeAgo
              date={comment.dateCreate}
              className={classes.timeAgo}
              title={null}
            />
            <button className={classes.button} onClick={handleClick}>
              Reply
            </button>
          </div>
        </div>
      </div>
      <div className={classes.reply}>
        <button className={classes.showReplyButton} onClick={showReply}>
          <div className={classes.divider}></div>
          <span>{text}</span>
        </button>
      </div>
      {isShowingReply & (replies.length > 0)
        ? replies.map((reply) => {
            return (
              <div className={classes.reply} key={reply.id}>
                <Avatar
                  alt="avatar"
                  src={reply.userAvatarUrl ? reply.userAvatarUrl : avatar}
                  className={classes.avatar}
                  style={{ width: 20 }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex" }}>
                    <Typography varian="body1" className={classes.displayName}>
                      {reply.userDisplayName}
                    </Typography>
                    <Typography varian="body1" style={{ fontSize: 14 }}>
                      {reply.content}
                    </Typography>
                  </div>
                  <TimeAgo
                    date={reply.dateCreate}
                    className={classes.timeAgo}
                    title={null}
                    live={false}
                  />
                </div>
              </div>
            );
          })
        : null}
      {isReplying ? (
        <div className={classes.reply}>
          <Avatar
            alt="avatar"
            src={comment.userAvatarUrl ? comment.userAvatarUrl : avatar}
            className={classes.avatar}
            style={{ width: 20 }}
          />
          <Paper className={classes.paper}>
            <TextField
              className={classes.textField}
              placeholder="Reply something..."
              multiline
              rows={1}
              rowsMax={3}
              onKeyDown={(e) => handleKeyDown(e, "id")}
              id={comment.id}
            />
          </Paper>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
