import { makeStyles, createTheme } from "@material-ui/core";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 700,
      lg: 1200,
      xl: 1536,
    },
  },
});
export default makeStyles(() => ({
  root: {},
  tabContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    width: "60%",
    margin: "100px auto 0 auto",
    [theme.breakpoints.down("sm")]: {
      margin: "100px 0",
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      margin: "100px 10px",
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
      margin: "100px auto 0 auto",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 220,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tabPanel: {
    width: "100%",
    padding: "30px 20px",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
