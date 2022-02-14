import {
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";

function LoadingPage() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <img src="https://i.imgur.com/TEq0FlR.png" />
          <Box>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default LoadingPage;
