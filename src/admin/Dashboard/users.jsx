import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { formatDistanceToNow } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useTranslate } from "react-admin";
import CardWithIcon from "./cardWithIcon";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.background.paper,
  },
  listItemText: {
    overflowY: "hidden",
    height: "4em",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  link: {
    borderRadius: 0,
  },
  linkContent: {
    color: theme.palette.primary.main,
  },
}));

const Users = ({ to, icon, title, value, color, users = [] }) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <CardWithIcon to={to} icon={icon} title={title} value={value} color={color}>
      <List>
        {users.map((user) => {
          let dateCreated = null;
          let lastDateOnline = null;

          try {
            dateCreated = formatDistanceToNow(new Date(user.createdAt));
            lastDateOnline = formatDistanceToNow(new Date(user.lastAccessed));
          } catch (ex) {}

          return (
            <ListItem
              key={user.id}
              button
              component={Link}
              to={`/users`}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  style={{ background: deepOrange[500] }}
                  src={user.avatarUrl}
                  className={classes.avatar}
                />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography>{user.userName + " - " + user.email}</Typography>
                }
                secondary={
                  "Created at: " +
                  (dateCreated ? dateCreated + " ago" : "Faraway") +
                  ", Online: " +
                  (lastDateOnline ? lastDateOnline + " ago" : "Faraway")
                }
                className={classes.listItemText}
                style={{ paddingRight: 0 }}
              />
            </ListItem>
          );
        })}
      </List>
      <Box flexGrow="1">&nbsp;</Box>
      <Button
        className={classes.link}
        component={Link}
        to="/users"
        size="small"
        color="primary"
      >
        <Box p={1} className={classes.linkContent}>
          {translate("See All Users")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default Users;
