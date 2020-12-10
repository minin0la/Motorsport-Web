import React, { useState } from "react";
import { data } from "../data/data";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
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

function DisplayCar() {
  const [carlist, setSort] = useState(
    data.filter((content) => content.types === "SUV").sort((a, b) => {})
  );

  const TheRender = () => {
    var rows = carlist
      .map((content) => {
        return (
          <Card>
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
      .map((rowContent) => {
        return <CardDeck className="mt-5">{rowContent}</CardDeck>;
      });
    return <div className="container">{rows}</div>;
  };
  return <TheRender />;
}
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
