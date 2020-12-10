import React, { useState } from "react";
import { data } from "../data/data";
import Form from "react-bootstrap/Form";

const ChooseCar = () => {
  let thelist = data
    .filter((x) => x.types === "Bicycle")
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const [carlist, setSort] = useState(thelist);

  const [carType, setCarType] = useState("Bicycle");

  const [type, setType] = useState(thelist[0]);
  const [type2, setType2] = useState(thelist[0]);
  const [type3, setType3] = useState("NameAscending");

  const [carDetail, setDetail] = useState(thelist[0]);

  const SortByPrice = (condition) => {
    let sorted = data.filter((x) => x.types === carType);
    if (condition === "PriceAscending") {
      sorted.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (condition === "PriceDescending") {
      sorted.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    if (condition === "NameAscending") {
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (condition === "NameDescending") {
      sorted.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    setSort(sorted);
    setType(sorted[0].name);
    ShowDetail(sorted[0].name);
  };

  const ImageRender = () => {
    return (
      <>
        <div className="row justify-content-center ">
          <img
            className="mx-auto mb-5"
            src={carDetail.vehicle_image}
            alt=""
            width="80%"
            height="100%"
          />
          <img
            className="mx-auto"
            src={carDetail.performance_image}
            alt=""
            width="80%"
            height="100%"
          />
        </div>
      </>
    );
  };

  const ShowDetail = (vehicle) => {
    let selected = data.filter((x) => x.name === vehicle);
    setDetail(selected[0]);
  };
  const ChangeCarType = (selecttype) => {
    let sorted = data.filter((x) => x.types === selecttype);
    if (type3 === "PriceAscending") {
      sorted.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (type3 === "PriceDescending") {
      sorted.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    if (type3 === "NameAscending") {
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (type3 === "NameDescending") {
      sorted.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    setCarType(selecttype);
    setSort(sorted);
    setType(sorted[0].name);
    ShowDetail(sorted[0].name);
  };

  const DetailRender = () => {
    return (
      <>
        <h1 className="m-5 text-success text-center">
          $ {carDetail.price.toLocaleString()}
        </h1>
        <div className="row justify-content-center ">
          <div className="col-sm-6 ">
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/1085/1085961.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Type: {carDetail.types}</p>
              </li>
              <li className="list-group-item text-center ">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/1253/1253360.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Brand: {carDetail.brand}</p>
              </li>
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/2457/2457289.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Capcity: {carDetail.capacity}</p>
              </li>
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/1514/1514474.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Drive: {carDetail.drive}</p>
              </li>
            </ul>
          </div>
          <div className="col-sm-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/638/638490.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Storage: {carDetail.trunk}</p>
              </li>
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/62/62499.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Lap time: {carDetail.lap_time}</p>
              </li>
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/748/748060.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">Top speed: {carDetail.top_speed} km/h</p>
              </li>
              <li className="list-group-item text-center">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/1441/1441264.svg"
                  alt=""
                  width="50px"
                />
                <p className="mt-2">
                  For sale: {carDetail.sale_status ? "✅" : "❌"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const SortByRender = () => {
    return (
      <>
        <Form>
          <Form.Group controlId="formBasicSelect">
            <Form.Label></Form.Label>
            <Form.Control
              as="select"
              value={type3}
              onChange={(e) => {
                setType3(e.target.value);
                SortByPrice(e.target.value);
              }}
            >
              <option value="PriceAscending">Sort By Price (Ascending)</option>
              <option value="PriceDescending">
                Sort By Price (Descending)
              </option>
              <option value="NameAscending">Sort By Name (Ascending)</option>
              <option value="NameDescending">Sort By Name (Descending)</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </>
    );
  };
  const CarSelectRender = () => {
    var rows = carlist.map((content, index) => {
      return (
        <option key={index} value={content.name}>
          {content.name} - ${content.price.toLocaleString()}
        </option>
      );
    });
    return (
      <>
        <Form>
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Select Vehicle</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                ShowDetail(e.target.value);
              }}
            >
              {rows}
            </Form.Control>
          </Form.Group>
        </Form>
      </>
    );
  };
  const TypeSelectRender = () => {
    let cartypes = data
      .map((x) => x.types)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .sort((a, b) => (a > b ? 1 : -1));

    var rows = cartypes.map((content, index) => {
      return (
        <option key={index} value={content}>
          {content}
        </option>
      );
    });
    return (
      <>
        <Form>
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Select Vehicle Type</Form.Label>
            <Form.Control
              as="select"
              value={type2}
              onChange={(e) => {
                setType2(e.target.value);
                ChangeCarType(e.target.value);
              }}
            >
              {rows}
            </Form.Control>
          </Form.Group>
        </Form>
      </>
    );
  };
  return (
    <>
      <div className="container mt-5 ">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-7">
            <ImageRender />
          </div>
          <div className="col-sm-5">
            {/* <div className=" mt-5 mb-5">
              <button
                className="btn-primary btn btn-block"
                type="button"
                onClick={() => SortByPrice("PriceAscending")}
              >
                Sort By Price (Ascending)
              </button>
              <button
                className="btn-danger btn btn-block"
                type="button"
                onClick={() => SortByPrice("PriceDescending")}
              >
                Sort By Price (Descending)
              </button>
              <button
                className="btn-primary btn btn-block"
                type="button"
                onClick={() => SortByPrice("NameAscending")}
              >
                Sort By Name (Ascending)
              </button>
              <button
                className="btn-danger btn btn-block"
                type="button"
                onClick={() => SortByPrice("NameDescending")}
              >
                Sort By Name (Descending)
              </button>
            </div> */}
            <SortByRender />
            <TypeSelectRender />
            <CarSelectRender />
            <DetailRender />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseCar;
