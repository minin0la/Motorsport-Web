import { Button, createTheme, CssBaseline, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import ReactPlayer from "react-player";
import MenuAppBar from "./MenuAppBar";
// import heroVideo from "../../public/videos/intro.m4v";

function HomePage() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const useStyles = makeStyles({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title: {
      paddingBottom: darkTheme.spacing(4),
    },
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <header>
          <div className="videoheader">
            {/* <div className="overlay"></div> */}
            <video
              playsInline="playsinline"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              <source src="/videos/intro.m4v" type="video/mp4" />
            </video>

            <div className={classes.overlay}>
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                color="#fff"
              >
                <Typography
                  variant="h3"
                  component="h1"
                  className={classes.title}
                >
                  <img
                    src="/logo/logo.png"
                    style={{
                      minWidth: "300px",
                      width: "1000px",
                      maxWidth: "50%",
                    }}
                    alt=""
                  />
                </Typography>
                <Button color="primary" variant="contained" href="/vehicles">
                  Click Me
                </Button>
              </Box>
            </div>
            {/* <MenuAppBar /> */}
          </div>
        </header>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default HomePage;
