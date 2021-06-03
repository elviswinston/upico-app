import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { MoreHoriz } from "@material-ui/icons";

import useStyles from "./styles/commentStyles";

import TimeAgo from "react-timeago";

import { AvatarService, CommentService } from "../../../services/services";

const Comment = ({ comment }) => {
  const classes = useStyles();

  const [isReplying, setIsReplying] = useState(false);
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [replies, setReplies] = useState(comment.childs ? comment.childs : []);
  const [text, setText] = useState("Show replies");
  const [avatar, setAvatar] = useState("");

  const username = localStorage.getItem("username");

  const handleClick = () => {
    setIsReplying(!isReplying);
    AvatarService.getUserAvatar(username).then((response) => {
      response.status === 404 ? setAvatar(null) : setAvatar(response.data.path);
    });
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
            setIsReplying(false);
            setIsShowingReply(true);
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
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <Typography varian="body1" className={classes.displayName}>
              {comment.userDisplayName}
            </Typography>
            <Typography
              varian="body1"
              style={{
                fontSize: 14,
                wordBreak: "break-word",
              }}
            >
              {comment.content}
            </Typography>
            <MoreHoriz className={classes.moreButton} />
          </div>
          <div>
            <TimeAgo
              date={comment.dateCreate}
              className={classes.timeAgo}
              title={null}
              live={false}
            />
            <button className={classes.button} onClick={handleClick}>
              Reply
            </button>
          </div>
        </div>
      </div>
      {replies?.length > 0 && (
        <div className={classes.reply}>
          <button className={classes.showReplyButton} onClick={showReply}>
            <div className={classes.divider}></div>
            <span>{text}</span>
          </button>
        </div>
      )}
      {isShowingReply & (replies?.length > 0)
        ? replies?.map((reply) => {
            return (
              <div className={classes.reply} key={reply.id}>
                <Avatar
                  alt="avatar"
                  src={reply.userAvatarUrl ? reply.userAvatarUrl : avatar}
                  className={classes.avatar}
                  style={{ width: 25, height: 25 }}
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
        <div className={classes.reply} style={{ alignItems: "center" }}>
          <Avatar
            alt="avatar"
            src={avatar}
            className={classes.avatar}
            style={{ width: 25, height: 25 }}
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
