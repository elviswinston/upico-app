import {
  Avatar,
  Box,
  ButtonBase,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@material-ui/core";

import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SendIcon from "@material-ui/icons/Send";
import "./styles/inboxStyle.css";
import { useSelector } from "react-redux";
import { getSelectedHub } from "../../store/messages";
import { useState, Fragment, useRef, useEffect } from "react";
import { format } from "date-fns";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const MessagesArea = ({ chatHubService }) => {
  const messagesEndRef = useRef(null);

  const [messageToSend, setMessageToSend] = useState("");
  const selectedHub = useSelector(getSelectedHub);
  const selectedHubId = useSelector((state) => state.message.selectedHubId);

  //withdrawn menu
  const [collapseIn, setCollapseIn] = useState(null);
  //

  const loading = useSelector((state) => state.message.loadding);

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
            const date = new Date(message.createdAt);
            const messageTime = format(date, "MM/dd/yyyy 'at' h:mm a");
            return (
              <Box
                className=" chat-message-position p4"
                key={message.id}
                display="flex"
                alignItems="center"
                justifyContent={
                  message.senderId === selectedHub.senderId ? "right" : "left"
                }
              >
                {message.senderId === selectedHub.senderId && (
                  <Box display="flex" alignItems="center">
                    <Collapse
                      orientation="horizontal"
                      in={collapseIn === message.id}
                    >
                      <IconButton
                        onClick={() => {
                          chatHubService.withdrawnMessage(message.id);
                          setCollapseIn(null);
                        }}
                      >
                        <CancelPresentationIcon color="error" />
                      </IconButton>
                    </Collapse>
                    {!message.isWithDraw && (
                      <IconButton
                        onClick={() => {
                          if (collapseIn === null) setCollapseIn(message.id);
                          else setCollapseIn(null);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
                <Box
                  className={
                    message.senderId === selectedHub.senderId
                      ? "chat-content-right"
                      : "chat-content-left"
                  }
                >
                  <Tooltip
                    title={messageTime}
                    placement={
                      message.senderId === selectedHub.senderId
                        ? "left"
                        : "right"
                    }
                  >
                    <Box>
                      {message.isWithDraw ? (
                        <DeleteOutlineIcon fontSize="small" color="primary" />
                      ) : (
                        message.content
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
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
