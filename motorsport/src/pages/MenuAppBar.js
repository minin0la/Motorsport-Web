import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  createTheme,
  CssBaseline,
  IconButton,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: darkTheme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    maxHeight: 40,
    marginTop: "12px",
    marginRight: "10px",
  },
});

export default function MenuAppBar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <ListItemButton component="a" href="/">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component="a" href="/vehicles">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Vehicles" />
        </ListItemButton>
      </List>
    </Box>
  );

  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar classes={{ root: classes.toolbar }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={toggleDrawer("left", true)}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <img
                  src="https://i.imgur.com/TEq0FlR.png"
                  alt="PDM"
                  className={classes.logo}
                />
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list()}
        </Drawer>
      </ThemeProvider>
    </React.Fragment>
  );
}
