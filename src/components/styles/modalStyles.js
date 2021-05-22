import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modalOverflay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  root: {
    position: "fixed",
    top: 97,
    left: "34%",
    width: "550px",
    zIndex: 100,
  },
  header: {
    backgroundColor: "#2a3f54",
    padding: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  avatarContainer: {
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
  textField: {
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
  action: {
    padding: "0 10px 10px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 2,
    border: "1px solid #eeeeee",
    padding: 5,
    marginRight: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#009688",
    },
    "&:hover svg": {
      color: "white",
    },
  },
  icon: {
    color: "#009688",
    width: 20,
    height: 20,
    cursor: "pointer",
  },
  previewImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
}));
