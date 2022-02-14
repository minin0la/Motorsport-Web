import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import * as React from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

function VehiclesList() {
  const [loading, setLoading] = useState(true);

  const [vehicles, setVehicles] = useState([]);
  const vehiclesCollectionRef = collection(db, "vehicles");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const getVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);

      setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilteredVehicles(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };
    getVehicles();
  }, []);

  const [state, setState] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const handleSearch = (event) => {
    if (event.target.value.length === 0) {
      setSearchText("");
    } else {
      setSearchText(event.target.value);
    }
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      setState([...state, event.target.value]);
    } else {
      setState(state.filter((id) => id !== event.target.value));
    }
  };
  useEffect(() => {
    if (state.length === 0 && searchText.length === 0) {
      setFilteredVehicles(vehicles);
    } else if (searchText.length === 0 && state.length !== 0) {
      setFilteredVehicles(
        vehicles.filter((vehicle) =>
          state.some((type) => [vehicle.type].flat().includes(type))
        )
      );
    } else if (searchText.length !== 0 && state.length === 0) {
      setFilteredVehicles(
        vehicles.filter((vehicle) =>
          vehicle.name
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredVehicles(
        vehicles
          .filter((vehicle) =>
            state.some((type) => [vehicle.type].flat().includes(type))
          )
          .filter((vehicle) =>
            vehicle.name
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
      );
    }
  }, [state, searchText]);

  return (
    <>
      {loading === false ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{ pt: 8, pb: 6 }}
          >
            <img src="https://i.imgur.com/TEq0FlR.png" />
          </Container>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <TextField
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  onChange={handleSearch}
                />
                <FormLabel component="legend">Filter</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={sports}
                        onChange={handleChange}
                        name="sports"
                        value="Sports"
                      />
                    }
                    label="Sports"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="SUV"
                        value="SUV"
                      />
                    }
                    label="SUV"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Off Road"
                        value="Off Road"
                      />
                    }
                    label="Off Road"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Motorcycle"
                        value="Motorcycle"
                      />
                    }
                    label="Motorcycle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Muscle"
                        value="Muscle"
                      />
                    }
                    label="Muscle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Sports(Classic)"
                        value="Sports(Classic)"
                      />
                    }
                    label="Sports (Classic)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Sedans"
                        value="Sedans"
                      />
                    }
                    label="Sedans"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={SUV}
                        onChange={handleChange}
                        name="Compacts"
                        value="Compacts"
                      />
                    }
                    label="Compacts"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={4}>
                {filteredVehicles.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.name}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={item.veh_img}
                        // alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        // <ThemeProvider theme={darkTheme}>
        //   <CssBaseline />
        //   <Grid container justifyContent="center">
        //     <Box sx={{ display: "flex" }}>
        //       <CircularProgress />
        //     </Box>
        //   </Grid>
        // </ThemeProvider>
        <LoadingPage />
      )}
    </>
  );
}
export default VehiclesList;
