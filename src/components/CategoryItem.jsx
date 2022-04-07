import styled from "styled-components";
import { device } from "../responsive";
import { Link } from "react-router-dom";
const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 21, 0, 0.3));
  opacity: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  @media ${device.tablet} {
    height: auto;
    width: 100%;
    object-fit: contain;
  }
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  margin: 3px;

  &:hover ${InfoContainer} {
    opacity: 1;
    transition: all 0.5s ease-in;
  }
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  font-size: 3rem;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

function CategoryItem({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      <InfoContainer>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.cat}`}>
          <Button>Shop Now</Button>
        </Link>
      </InfoContainer>
    </Container>
  );
}

export default CategoryItem;
