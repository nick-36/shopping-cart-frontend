import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../data";
import { device } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  overflow: hidden;
  display: flex;
  align-items: center;
  @media ${device.tablet} {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  transition: all 1s ease-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  /* transform: translateX(0vw); */
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 5rem;
`;
const Title = styled.h1`
  font-size: 5rem;
`;
const Desc = styled.p`
  font-size: 2rem;
  letter-spacing: 3px;

  padding: 2rem 0;
`;
const Button = styled.button`
  padding: 1rem;
  margin-top: 5rem;
  font-size: 2rem;
  box-shadow: 0 2px 10px rgb(0, 0, 0, 0.4);
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

function Slider(props) {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else if (direction === "right") {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ChevronLeftIcon style={{ fontSize: "4rem" }} />
      </Arrow>
      <Wrapper>
        {sliderItems.map((item) => {
          return (
            <Slide key={item.id} slideIndex={slideIndex} bg={item.bg}>
              <ImageContainer>
                <Image src={item.img} />
              </ImageContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Link to="/products/popular">
                  <Button>Shop Now</Button>
                </Link>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ChevronRightIcon style={{ fontSize: "4rem" }} />
      </Arrow>
    </Container>
  );
}

export default Slider;
