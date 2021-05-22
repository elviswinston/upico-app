import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#2a3f54",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    height: 60,
    padding: "0 40px",
  },
  logo: {
    width: "60%",
    height: "auto",
    cursor: "pointer",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 25,
    borderRadius: 3,
    "&:hover": {
      cursor: "text",
    },
  },
  input: {
    width: "20%",
    "&[search='1']": {
      width: "100%",
    },
  },
  icon: {
    color: "#009688",
    "&[icon='search']": {
      color: "lightgray",
    },
  },
  iconButton: {
    padding: 5,
  },
  avatarContainer: {
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 25,
    height: "auto",
    marginRight: 10,
  },
  name: {
    fontSize: 12,
    color: "#009688",
    fontWeight: "bold",
  },
}));
