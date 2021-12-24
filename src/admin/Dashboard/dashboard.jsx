import CardWithIcon from "./cardWithIcon";
import Welcome from "./welcome";
import {
  pink,
  green,
  purple,
  cyan,
  lime,
  amber,
  deepPurple,
  lightGreen,
} from "@material-ui/core/colors";
import { getDashboardInfo } from "../../services/admin-service";
import { useEffect, useState } from "react";
import Users from "./users";
import PersonIcon from "@material-ui/icons/Person";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import CommentIcon from "@material-ui/icons/Comment";
import ForumIcon from "@material-ui/icons/Forum";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactlessIcon from "@material-ui/icons/Contactless";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const DashBoard = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const asyncFunc = async () => {
      const info = await getDashboardInfo();
      setInfo(info);
    };

    asyncFunc();
  }, []);

  const {
    totalAccess,
    totalComments,
    totalLikes,
    totalMessages,
    totalPosts,
    totalUsers,
    newUsers,
    onlineUsers,
  } = info;

  return (
    <div>
      <div style={styles.flexColumn}>
        <div>
          <Welcome />
        </div>
        <div style={styles.flex}>
          <CardWithIcon
            to="/abc"
            icon={<PersonIcon />}
            title={"Total Users"}
            subtitle={totalUsers}
            color={green[500]}
          />
          <Spacer />
          <CardWithIcon
            to="/abc"
            icon={<DynamicFeedIcon />}
            title={"Total Posts"}
            subtitle={totalPosts}
            color={purple[500]}
          />
          <Spacer />
          <CardWithIcon
            to="/abc"
            icon={<CommentIcon />}
            title={"Total Comments"}
            subtitle={totalComments}
            color={cyan[500]}
          />
        </div>
        <VerticalSpacer />
        <div style={styles.flex}>
          <CardWithIcon
            to="/abc"
            icon={<FavoriteBorderIcon />}
            title={"Total Likes"}
            subtitle={totalLikes}
            color={lime[500]}
          />
          <Spacer />
          <CardWithIcon
            to="/abc"
            icon={<ForumIcon />}
            title={"Total Messages"}
            subtitle={totalMessages}
            color={amber[500]}
          />
          <Spacer />
          <CardWithIcon
            to="/abc"
            icon={<CompareArrowsIcon />}
            title={"Total Accesses"}
            subtitle={totalAccess}
          />
        </div>
        <VerticalSpacer />
        <div style={styles.flex}>
          <Users
            to="/users"
            icon={<PersonAddIcon />}
            title="New Users"
            color={deepPurple[500]}
            users={newUsers}
          />
          <Spacer />
          <Users
            to="/users"
            icon={<ContactlessIcon />}
            title="Online User"
            color={lightGreen[500]}
            users={onlineUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
