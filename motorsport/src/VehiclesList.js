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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Pagination,
} from "@mui/material";
import * as React from "react";
import { db } from "./firebase-config";
import { collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GarageIcon from "@mui/icons-material/Garage";
import CallIcon from "@mui/icons-material/Call";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function VehiclesList() {
  const [loading, setLoading] = useState(true);
  const [rawVehicles, setRawVehicles] = useState();
  const [vehicles, setVehicles] = useState([]);
  const vehiclesCollectionRef = collection(db, "vehicles");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setvehiclesPerPage] = useState(6);

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

  const indexOfLastVehicles = currentPage * vehiclesPerPage;
  const indexOfFirstVehicles = indexOfLastVehicles - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstVehicles,
    indexOfLastVehicles
  );

  const [state, setState] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
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
            <Grid
              container
              item
              xs={12}
              md={3}
              spacing={4}
              direction="column"
              // justifyContent="center"
            >
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="Search (Enter)"
                  variant="standard"
                  // value={query}
                  // onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleSearch}
                />
              </Grid>
              <Grid item>
                <FormControl
                  // sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <Accordion
                    sx={{ defaultExpanded: { xs: "true", md: "false" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Filters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                  </Accordion>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              // sm={10}
              md={8}
              spacing={4}
              alignContent="center"
              justifyContent="center"
            >
              {/* <Stack> */}
              <Grid container item spacing={2} justifyContent="center">
                {currentVehicles.map((item) => (
                  <Grid item xs={10} sm={5} md={4} key={item.id}>
                    {/* <Badge color="secondary" badgeContent=" "> */}
                    <Card>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={item.vehicle_image}
                        loading="lazy"
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
              <Grid
                // container
                p={2}
                item
                alignContent="center"
                justifyContent="center"
              >
                <Pagination
                  onChange={(e, page) => {
                    // console.log(e.target.textContent);
                    setCurrentPage(page);
                  }}
                  count={Math.ceil(filteredVehicles.length / vehiclesPerPage)}
                />
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
