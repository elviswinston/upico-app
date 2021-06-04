import { Avatar, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import useStyles from "./styles/commentStyles";

import TimeAgo from "react-timeago";

import { AvatarService, CommentService } from "../../../services/services";

const Comment = ({ comment }) => {
  const classes = useStyles();

  const [isReplying, setIsReplying] = useState(false);
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [text, setText] = useState("Show " + comment.replies + " replies");
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
    if (replies.length < comment.replies && isShowingReply) {
      const latestReplyId = replies[replies.length - 1].id;
      CommentService.getMoreReply(comment.id, latestReplyId).then(
        (response) => {
          if (response.status === 200) {
            setReplies((prevReplies) => {
              return prevReplies.concat(response.data);
            });
            const remainReply =
              comment.replies - replies.length - response.data.length;
            remainReply !== 0
              ? setText("Show more " + remainReply + " replies")
              : setText("Hide replies");
          }
        }
      );
    } else if (replies.length === comment.replies && isShowingReply) {
      setText("Show replies");
      setIsShowingReply(false);
    } else {
      setIsShowingReply(true);
      replies.length === comment.replies
        ? setText("Hide replies")
        : setText(
            "Show more " + (comment.replies - replies.length) + " replies"
          );
    }
  };

  useEffect(() => {
    CommentService.getReply(comment.id).then((response) => {
      if (response.status === 200) {
        setReplies(response.data);
      }
    });
  }, [comment]);

  return (
    <div>
      <div className={classes.comment}>
        <Avatar
          alt="avatar"
          src={comment.userAvatarUrl ? comment.userAvatarUrl : avatar}
          className={classes.avatar}
          onClick={() => {
            window.location.href =
              window.location.origin + "/" + comment.username;
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <a href={"/" + comment.username} className={classes.displayName}>
              {comment.userDisplayName}
            </a>
            <Typography
              varian="body1"
              style={{
                fontSize: 14,
                wordBreak: "break-word",
              }}
            >
              {comment.content}
            </Typography>
            <MoreHorizIcon className={classes.moreButton} />
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
                  onClick={() => {
                    window.location.href =
                      window.location.origin + "/" + reply.username;
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex" }}>
                    <a
                      href={"/" + reply.username}
                      className={classes.displayName}
                    >
                      {reply.userDisplayName}
                    </a>
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
          <TextField
            className={classes.textField}
            multiline
            rows={1}
            rowsMax={2}
            onKeyDown={(e) => handleKeyDown(e, "id")}
            id={comment.id}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
