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
  CardActions,
  Button,
} from "@mui/material";
import * as React from "react";
import { db } from "./firebase-config";
import { collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GarageIcon from "@mui/icons-material/Garage";
import CallIcon from "@mui/icons-material/Call";

function VehiclesList() {
  const [loading, setLoading] = useState(true);
  const [rawVehicles, setRawVehicles] = useState()
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
      // const data = await getDocs(vehiclesCollectionRef);

      // setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setFilteredVehicles(
      //   data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      // );

      const axios = require("axios");

      axios
        .get("https://pdm-ecrp.herokuapp.com/mysql")
        // .get("http://localhost:9000/mysql")
        .then((res) => {
          setVehicles(res.data);
          setFilteredVehicles(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getVehicles();
  }, []);

  const [state, setState] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [query, setQuery] = useState("");


  const handleSearch = (event) => {
    // if (event.target.value.length === 0) {
    //   setSearchText("");
    // } else {
    if (event.key === "Enter") {
      setSearchText(event.target.value);
    }

    // }
  };
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setSearchText(query), 1000);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);

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
          state.some((type) =>
            [vehicle.type.toLowerCase()].flat().includes(type.toLowerCase())
          )
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
            state.some((type) =>
              [vehicle.type.toLowerCase()].flat().includes(type.toLowerCase())
            )
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
          <Grid
            container
            spacing={4}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Grid container item xs={12} md={3} justifyContent="center">
              <div>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <TextField
                    id="standard-basic"
                    label="Search (Enter)"
                    variant="standard"
                    // value={query}
                    // onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <FormLabel component="legend">Filter</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={sports}
                          onChange={handleChange}
                          name="sports"
                          value="SPORTS"
                        />
                      }
                      label="Sports"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChange}
                          name="SUVs"
                          value="SUVS"
                        />
                      }
                      label="SUVs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChange}
                          name="Off Road"
                          value="OFF_ROAD"
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
                          value="MOTORCYCLES"
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
                          value="MUSCLE"
                        />
                      }
                      label="Muscle"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={SUV}
                          onChange={handleChange}
                          name="Sports (Classic)"
                          value="SPORTS_CLASSIC"
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
                          value="SEDANS"
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
                          value="COMPACTS"
                        />
                      }
                      label="Compacts"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </div>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              // sm={10}
              md={8}
              spacing={4}
              justifyContent="center"
            >
              {filteredVehicles.map((item) => (
                <Grid item xs={10} sm={5} md={4} key={item.id}>
                  {/* <Badge color="secondary" badgeContent=" "> */}
                  <Card>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={item.vehicle_image}
                      // alt="green iguana"
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.actual_price.toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small">Share</Button> */}
                      {item.stock > 1 ? (
                        <Button
                          // size="small"
                          variant="contained"
                          color="success"
                          startIcon={<GarageIcon />}
                        >
                          In Stock
                        </Button>
                      ) : (
                        <Button
                          // size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<CallIcon />}
                        >
                          Order
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                  {/* </Badge> */}
                </Grid>
              ))}
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
