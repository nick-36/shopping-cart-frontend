import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";

import { productAdded } from "../Store/cartSlice";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { device } from "../responsive";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media ${device.laptop} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ImageContainer = styled.div`
  margin: 4rem;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  @media ${device.mobileL} {
    height: 500px;
    object-fit: contain;
  }
`;
const InfoContainer = styled.div`
  margin: 4rem;
`;
const Title = styled.h1`
  font-size: 4rem;
  padding: 2rem 0;
`;
const Desc = styled.p`
  font-size: 2rem;
  padding: 2rem 0;
`;
const Price = styled.h2`
  font-size: 3.2rem;
  font-weight: 300;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  @media ${device.laptop} {
    width: 100%;
  }
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  cursor: pointer;
`;
const FilterText = styled.span``;
const Filter = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 2rem;
  padding: 4rem 0;
`;

const FilterSize = styled.select`
  padding: 5px;

  font-size: 1.6rem;
`;
const FilterSizeOption = styled.option`
  font-size: 1.6rem;
`;

const AddContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  @media ${device.laptop} {
    width: 100%;
  }
`;
const AmountContainer = styled.div`
  padding: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
const Amount = styled.span`
  font-size: 2rem;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: whitesmoke;
  }
`;

function Product(props) {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("black");
  const [size, setSize] = useState("s");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 &&
        setQuantity((preValue) => {
          return preValue - 1;
        });
    } else if (type === "inc") {
      return setQuantity((preValue) => {
        return preValue + 1;
      });
    }
  };

  const handleClick = async () => {
    if (isAuthenticated) {
      dispatch(productAdded({ ...product, quantity, color, size }));
    } else {
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price> ${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterText>Color</FilterText>
              {product.color?.map((c) => {
                return (
                  <FilterColor key={c} color={c} onClick={() => setColor(c)} />
                );
              })}
            </Filter>
            <Filter>
              <FilterText>Size</FilterText>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => {
                  return <FilterSizeOption key={s}>{s}</FilterSizeOption>;
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => handleQuantity("dec")}
                style={{ fontSize: "2rem", cursor: "pointer" }}
              />
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => handleQuantity("inc")}
                style={{ fontSize: "2rem", cursor: "pointer" }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Product;
