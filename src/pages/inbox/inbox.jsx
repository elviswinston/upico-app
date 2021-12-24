import {
  Avatar,
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import Header from "../../components/Header";

import CreateIcon from "@material-ui/icons/Create";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";
import ChatHubService from "../../store/chatHubService";
import "./styles/inboxStyle.css";
import MessagesArea from "./messagesArea";
import { selectHub } from "../../store/messages";
import { formatDistanceToNow } from "date-fns";

const chatHubService = new ChatHubService();

const Inbox = () => {
  const jwt = authService.getToken();
  const dispatch = useDispatch();
  const messageHubs = useSelector((state) => state.message.messageHubs);
  const loading = useSelector((state) => state.message.loadding);

  useEffect(() => {
    if (jwt) {
      chatHubService.stopHubConnection();
      chatHubService.createHubConnection(jwt, dispatch);
    }
  }, [dispatch, jwt]);

  return (
    <div>
      <Header />
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="inbox-container">
              <div className="inbox-left col-12 col-lg-5 col-xl-3">
                <div className="inbox-username">
                  <div></div>
                  <div>{authService.getCurrentUser()}</div>
                  <div>
                    <IconButton>
                      <CreateIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="list-user">
                  {loading ? (
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    messageHubs.map((hub) => {
                      const lastAccessed = formatDistanceToNow(
                        new Date(hub.receiverLastAccessed)
                      );
                      return (
                        <div
                          className="user"
                          key={hub.id}
                          onClick={() => {
                            dispatch(selectHub(hub.id));
                          }}
                        >
                          <div>
                            <div className="inbox-inline">
                              <Avatar
                                className="inbox-avatar"
                                src={
                                  hub.receiverAvatarUrl
                                    ? hub.receiverAvatarUrl
                                    : ""
                                }
                              ></Avatar>
                              <div>
                                <div>{hub.receiverUserName}</div>
                                <div display="flex">
                                  <div></div>
                                  <Typography variant="caption">
                                    {lastAccessed + " ago"}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <MessagesArea chatHubService={chatHubService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
