import Inbox from "./inbox";
import { store } from "../../store/store";
import { Provider } from "react-redux";

const InboxContainer = () => {
  return (
    <Provider store={store}>
      <Inbox />
    </Provider>
  );
};

export default InboxContainer;
