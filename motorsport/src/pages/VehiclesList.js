import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  CssBaseline,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Pagination,
  InputAdornment,
  useMediaQuery,
  Divider,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useState, useEffect } from "react";
import LoadingPage from "../LoadingPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MenuAppBar from "./MenuAppBar";

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

function VehiclesList() {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setvehiclesPerPage] = useState(6);

  const mobileMatch = useMediaQuery(darkTheme.breakpoints.up("md"));

  useEffect(() => {
    const getVehicles = async () => {
      const axios = require("axios");

      axios
        .get(
          "https://eu-central-1.aws.data.mongodb-api.com/app/googlesheet-gfigm/endpoint/getVehicle"
        )
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
    setCurrentPage(1);
    if (state.length === 0 && searchText.length === 0) {
      setFilteredVehicles(vehicles);
    } else if (searchText.length === 0 && state.length !== 0) {
      setFilteredVehicles(
        vehicles.filter((vehicle) =>
          state.some((type) =>
            [vehicle.class.toLowerCase()].flat().includes(type.toLowerCase())
          )
        )
      );
    } else if (searchText.length !== 0 && state.length === 0) {
      setFilteredVehicles(
        vehicles.filter((vehicle) =>
          vehicle.veh_name
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
              [vehicle.class.toLowerCase()].flat().includes(type.toLowerCase())
            )
          )
          .filter((vehicle) =>
            vehicle.veh_name
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
      );
    }
  }, [state, searchText]);
  const classes = useStyles();
  return (
    <>
      {loading === false ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MenuAppBar />
          <Grid
            container
            spacing={4}
            sx={{ flexDirection: { xs: "column", md: "row" }, pt: 6, pb: 6 }}
          >
            <Grid
              container
              item
              xs={12}
              md={3}
              spacing={2}
              direction="column"
              alignContent="center"
            >
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="Search"
                  variant="outlined"
                  onKeyDown={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Accordion defaultExpanded={mobileMatch}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Filters</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider textAlign="left">Class</Divider>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange}
                            name="sports"
                            value="sport"
                          />
                        }
                        label="Sports"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange}
                            name="SUV"
                            value="SUV"
                          />
                        }
                        label="SUVs"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
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
                            onChange={handleChange}
                            name="Sports (Classic)"
                            value="Sport Classic"
                          />
                        }
                        label="Sports (Classic)"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange}
                            name="Sedans"
                            value="Sedan"
                          />
                        }
                        label="Sedans"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange}
                            name="Compacts"
                            value="COMPACT"
                          />
                        }
                        label="Compacts"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8}
              spacing={4}
              alignContent="center"
              justifyContent="center"
            >
              <Grid container item spacing={2} justifyContent="center">
                {currentVehicles.map((item) => (
                  <Grid item xs={10} sm={5} md={4} key={item.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={item.veh_img}
                        // loading="lazy"
                      />

                      <CardContent sx={{ mt: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.veh_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${parseInt(item.recommended_price).toLocaleString()}
                        </Typography>
                        {item.stock >= 1 ? (
                          <Chip
                            color="success"
                            label="In Stock"
                            sx={{ mt: 2 }}
                          />
                        ) : (
                          <Chip
                            color="error"
                            label="Out Of Stock"
                            sx={{ mt: 2 }}
                          />
                        )}
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
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
                  page={currentPage}
                  onChange={(e, page) => {
                    setCurrentPage(page);
                  }}
                  count={Math.ceil(filteredVehicles.length / vehiclesPerPage)}
                />
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
export default VehiclesList;
