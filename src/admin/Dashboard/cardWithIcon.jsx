import { Card, Box, Typography, Divider, Avatar } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import cartouche from "./cartouche.png";
import cartoucheDark from "./cartoucheDark.png";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 52,
    display: "flex",
    flexDirection: "column",
    flex: "1",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  main: (props) => ({
    overflow: "inherit",
    padding: 14,
    background: `url(${
      theme.palette.type === "dark" ? cartoucheDark : cartouche
    }) no-repeat`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  title: {},
  nothing: {},
}));

const CardWithIcon = (props) => {
  const classes = useStyles(props);
  const { icon, title, subtitle, to, children, color } = props;
  return (
    <Card className={classes.card}>
      <Link to={to}>
        <div className={classes.main}>
          <Box width="3em">
            <Avatar style={{ background: color ? color : pink[500] }}>
              {icon}
            </Avatar>
          </Box>
          <Box textAlign="right">
            <Typography className={classes.title} color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h5" component="h2">
              {subtitle || " "}
            </Typography>
          </Box>
        </div>
      </Link>
      {children && <Divider />}
      {children}
    </Card>
  );
};

export default CardWithIcon;
