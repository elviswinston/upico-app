import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#2a3f54",
  },
  container: {
    height: 60,
    padding: "0 100px",
  },
  logo: {
    width: "60%",
    height: "auto",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 25,
    borderRadius: 3,
    "&:hover": {
      cursor: "text",
    },
  },
  input: {
    width: "30%",
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
}));
