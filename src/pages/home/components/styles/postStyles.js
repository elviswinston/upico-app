import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  avatarContainer: {
    backgroundColor: "#2a3f54",
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
  content: {
    padding: 10,
  },
  text: {
    fontSize: 14,
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  likeComment: {
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
    color: "#009688",
  },
}));
