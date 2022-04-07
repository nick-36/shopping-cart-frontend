import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
// import { Icon } from "@material-ui/core";

const Icons = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  cursor: pointer;
`;

const Container = styled.div`
  min-width: 280px;
  height: 350px;
  position: relative;

  &:hover ${Icons} {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 21, 0, 0.3));
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
`;
const Image = styled.img`
  height: 70%;
  object-fit: cover;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Product({ item }) {
  return (
    <Container>
      <ImageContainer>
        <Image src={item.img} />
      </ImageContainer>
      <Icons>
        <IconBox>
          <ShoppingCartOutlinedIcon style={{ fontSize: "2rem" }} />
        </IconBox>
        <IconBox>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon style={{ fontSize: "2rem" }} />
          </Link>
        </IconBox>
        <IconBox>
          <FavoriteBorderOutlinedIcon style={{ fontSize: "2rem" }} />
        </IconBox>
      </Icons>
    </Container>
  );
}

export default Product;
