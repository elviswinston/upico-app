import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  datagrid: {
    "& th:nth-child(7)": {
      textAlign: "center",
    },
  },
  boolean_field: {
    display: "grid",
    placeItems: "center",
  },
}));
