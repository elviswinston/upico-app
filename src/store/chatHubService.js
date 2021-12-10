import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { addMessage, loadMessageHubs } from "./messages";

export default class chatHubService {
  hubConnection = null;

  createHubConnection = (jwt, dispatch) => {
    if (jwt) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat", {
          accessTokenFactory: () => jwt,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((ex) =>
          console.log("error extablishing the chat connection", ex)
        );

      this.hubConnection.on("LoadMessages", (messageHubs) => {
        dispatch(loadMessageHubs(messageHubs));
      });

      this.hubConnection.on("ReceiveMessage", (message) => {
        dispatch(addMessage(message));
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((ex) => console.log("error when stopping the chat connection"));
  };

  sendMessage = async (receiverId, message) => {
    const params = {
      receiverId: receiverId,
      message: message,
    };
    try {
      await this.hubConnection?.invoke("SendMessage", params);
    } catch (ex) {
      console.log("ex", ex);
    }
  };
}
