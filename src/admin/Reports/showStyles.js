import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  text_field: {
    display: "inline-block",
    marginRight: 30,
  },
  gallery: {
    margin: "20px 0",
  },
  galleryItem: {
    position: "relative",
    cursor: "pointer",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  table: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));
