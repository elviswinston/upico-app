import { Avatar, IconButton, TextareaAutosize } from "@material-ui/core";
import Header from "../../components/Header";

import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CreateIcon from "@material-ui/icons/Create";

import "./styles/inboxStyle.css";

const Inbox = () => {
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
                  <div>username</div>
                  <div>
                    <IconButton>
                      <CreateIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="list-user">
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="user">
                    <a>
                      <div className="inbox-inline">
                        <Avatar className="inbox-avatar">A</Avatar>
                        <div>
                          <div>Hung</div>
                          <div>Thời gian</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-12 col-lg-7 col-xl-9">
                <div className="inbox-title">
                  <div className="title">
                    <Avatar className="inbox-avatar">A</Avatar>
                    <div>Name</div>
                  </div>
                  <div>
                    <IconButton>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="chat-message p-4">
                  <div className=" chat-message-position p4">
                    <div className="chat-content-right">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-left">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-right">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-left">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-right">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-left">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-right">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-left">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
                  <div className=" chat-message-position p4">
                    <div className="chat-content-right">
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>
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
                    ></TextareaAutosize>
                    <>
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
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
