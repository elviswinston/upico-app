import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  datagrid: {
    "& th:nth-child(6)": {
      textAlign: "center",
    },
  },
  align_center: {
    display: "grid",
    placeItems: "center",
  },
}));
