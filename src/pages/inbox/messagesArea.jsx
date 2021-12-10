import { Avatar, IconButton, TextareaAutosize } from "@material-ui/core";

import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SendIcon from "@material-ui/icons/Send";
import "./styles/inboxStyle.css";
import { useSelector } from "react-redux";
import { getSelectedHub } from "../../store/messages";
import { useState, Fragment, useRef, useEffect } from "react";

const MessagesArea = ({ chatHubService }) => {
  const messagesEndRef = useRef(null);

  const [messageToSend, setMessageToSend] = useState("");
  const selectedHub = useSelector(getSelectedHub);
  const selectedHubId = useSelector((state) => state.message.selectedHubId);

  const scrollToBottom = (isSmooth = false) => {
    if (isSmooth)
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    else {
      messagesEndRef.current?.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [selectedHub?.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedHubId]);

  const sendMessage = async () => {
    await chatHubService.sendMessage(selectedHub?.receiverId, messageToSend);

    setMessageToSend("");
  };

  return (
    <div className=" col-12 col-lg-7 col-xl-9 ">
      <div className="inbox-title">
        <div className="title">
          <Avatar
            src={
              selectedHub?.receiverAvatarUrl
                ? selectedHub.receiverAvatarUrl
                : ""
            }
            className="inbox-avatar"
          >
            A
          </Avatar>
          <div>{selectedHub?.receiverUserName}</div>
        </div>
        <div>
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-message p-4">
        {selectedHub &&
          selectedHub.messages.map((message) => {
            return (
              <div className=" chat-message-position p4">
                <div
                  className={
                    message.senderId === selectedHub.senderId
                      ? "chat-content-right"
                      : "chat-content-left"
                  }
                >
                  {message.content}
                </div>
              </div>
            );
          })}

        <div ref={messagesEndRef} />
      </div>
      <div className="inbox-input-container">
        <div className="inbox-input-block">
          <div>
            <IconButton>
              <SentimentSatisfiedIcon />
            </IconButton>
          </div>
          <TextareaAutosize
            placeholder="Send message..."
            className="input-text"
            rowsMax={6}
            value={messageToSend}
            onChange={(e) => {
              setMessageToSend(e.currentTarget.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && e.shiftKey === false) {
                e.preventDefault();
                await sendMessage();
              }
            }}
          ></TextareaAutosize>
          {messageToSend.length > 0 ? (
            <IconButton
              onClick={async () => {
                await sendMessage();
              }}
            >
              <SendIcon color="primary" />
            </IconButton>
          ) : (
            <Fragment>
              <div>
                <IconButton>
                  <ImageOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <IconButton>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesArea;
