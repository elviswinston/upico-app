import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  avatar: {
    width: 25,
    height: "auto",
    marginRight: 10,
    border: "1px solid #bbb",
  },
  comment: {
    display: "flex",
    padding: "0 15px",
    alignItems: "center",
    marginBottom: 10,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
  },
  timeAgo: {
    color: "#8e8e8e",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  button: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
    marginLeft: 5,
  },
  divider: {
    borderBottom: "1px solid rgba(var(--f52,142,142,142),1)",
    display: "inline-block",
    height: 0,
    marginRight: 16,
    verticalAlign: "middle",
    width: 24,
  },
  showReplyButton: {
    color: "#8e8e8e",
    background: "0 0",
    border: 0,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
    width: "auto",
    padding: 0,
    marginBottom: 10,
  },
  textField: {
    marginTop: 5,
    width: "100%",
    padding: 0,
    "& .MuiInput-underline input": {
      padding: 0,
    },
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
  paper: {
    padding: "2px 15px",
    borderRadius: "50px",
    width: "100%",
  },
  reply: {
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    marginLeft: 35,
  },
}));
