import { Avatar, IconButton, Typography } from "@material-ui/core";
import Header from "../../components/Header";

import CreateIcon from "@material-ui/icons/Create";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";
import ChatHubService from "../../store/chatHubService";
import "./styles/inboxStyle.css";
import MessagesArea from "./messagesArea";
import { selectHub } from "../../store/messages";

const chatHubService = new ChatHubService();

const Inbox = () => {
  const jwt = authService.getToken();
  const dispatch = useDispatch();
  const messageHubs = useSelector((state) => state.message.messageHubs);

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
                  {messageHubs.map((hub) => {
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
                            >
                            </Avatar>
                            <div>
                              <div>{hub.receiverUserName}</div>
                              <div display="flex">
                                <div></div>
                                <Typography variant="caption">1h</Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
