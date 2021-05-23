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
    padding: "10px 15px",
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
    position: "relative",
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
  comment: {
    padding: "0 15px",
    borderTop: "1px solid #cecece",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  textField: {
    marginTop: 5,
    width: "100%",
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "none",
    },
  },
  commentButton: {
    cursor: "pointer",
  },
  slideButton: {
    position: "absolute",
    top: "50%",
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "none",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  dot: {
    padding: 5,
    backgroundColor: "#bbb",
    borderRadius: "50%",
    marginLeft: 4,
    "&[active='1']": {
      backgroundColor: "#009688",
    },
  },
}));
