import React, { useState } from "react";
import { data } from "../data/data";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function ControlledCarousel() {
  return (
    <Carousel className="mb-5">
      <Carousel.Item>
        <img className="d-block w-100" src="/images/dubsta.jpg" alt="" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/xls.png" alt="" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/dubsta.jpg" alt="" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const DisplayCar = () => {
  const [carlist, setSort] = useState(
    data
      .filter((x) => x.types === "SUV")
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  );

  const SortByPrice = (condition) => {
    let sorted = data.filter((x) => x.types === "SUV");
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
  };
  const TheRender = () => {
    var rows = carlist
      .map((content, index) => {
        return (
          <Card key={index}>
            <Card.Img variant="top" src={content.vehicle_image} />
            <Card.Body>
              <Card.Title>{content.name}</Card.Title>
              <Card.Text>Price: {content.price}</Card.Text>
            </Card.Body>
          </Card>
        );
      })
      .reduce((r, element, index) => {
        index % 3 === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
      }, [])
      .map((rowContent, index) => {
        return (
          <CardDeck key={index} className="mt-5">
            {rowContent}
          </CardDeck>
        );
      });
    return <div className="container">{rows}</div>;
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="btn-group">
          <button
            className="btn-primary btn "
            type="button"
            onClick={() => SortByPrice("PriceAscending")}
          >
            Sort By Price (Ascending)
          </button>
          <button
            className="btn-danger btn "
            type="button"
            onClick={() => SortByPrice("PriceDescending")}
          >
            Sort By Price (Descending)
          </button>
          <button
            className="btn-primary btn"
            type="button"
            onClick={() => SortByPrice("NameAscending")}
          >
            Sort By Name (Ascending)
          </button>
          <button
            className="btn-danger btn"
            type="button"
            onClick={() => SortByPrice("NameDescending")}
          >
            Sort By Name (Descending)
          </button>
        </div>
      </div>
      <TheRender />
    </>
  );
};

function Suv() {
  return (
    <>
      <ControlledCarousel />
      <div className="container">
        <DisplayCar />
      </div>
    </>
  );
}

export default Suv;
