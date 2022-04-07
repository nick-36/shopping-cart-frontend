import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQty,
  getTotal,
  increaseQty,
  productDeleted,
} from "../Store/cartSlice";

import { useStripe } from "@stripe/react-stripe-js";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  margin: 0 2rem;
`;

const TopTexts = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

const TopText = styled.span`
  font-size: 2rem;
  text-decoration: underline;
  margin: 0 10px;
  cursor: pointer;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const Info = styled.div`
  width: 100%;
  flex: 3;
`;
const Title = styled.h1`
  font-size: 5rem;
  font-weight: 100;
  text-align: center;
  width: 100%;
  margin-top: 2rem;
`;

const Product = styled.div`
  /* background-color: #f8f9fa; */
  display: flex;
  border-bottom: 1px solid lightgray;
  margin-left: 2rem;

  margin-top: 2rem;
`;

const ProductDetails = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;
const ProductId = styled.span`
  font-size: 1.6rem;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  font-size: 1.6rem;
`;
const ProductName = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;

  margin-top: 1rem;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 168px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  gap: 2rem;

  @media ${device.mobileL} {
    margin-top: 2rem;
  }
`;
const ProductAmountContainer = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;

  font-weight: 700;
  gap: 1rem;
`;
const ProductAmount = styled.span``;
const ProductPrice = styled.p`
  font-size: 3rem;
  font-weight: 700;
  background-color: #e1ecf1;
  border-left: 5px solid #176c93;
  padding: 0 20px;
  @media ${device.mobileL} {
    font-size: 2rem;
    width: 50%;
  }
`;

const Delete = styled.span`
  font-size: 1.6rem;
  color: #176c93;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  margin: 0 2rem;
  padding: 2rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  height: 50vh;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.2);
  @media ${device.tablet} {
    margin: 0;
    box-shadow: none;
  }
  @media ${device.mobileL} {
    margin: 2rem 0;
  }
`;
const SummaryTitle = styled.h1`
  font-size: 3rem;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: ${(props) => props.type === "total" && 700};
`;
const SummaryItemText = styled.span`
  font-size: 2rem;
`;

const SummaryItemPrice = styled.span`
  font-size: 2rem;
`;

const SummaryButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 2rem;
  outline: none;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  font-size: 2rem;
  color: red;
  text-align: center;
  padding: 1rem;
`;

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const stripe = useStripe();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const line_items = cart.products.map((product) => {
      return {
        quantity: product.quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
            description: product.desc,
          },
        },
      };
    });

    try {
      const res = await userRequest.post("/checkout/create-checkout-session", {
        line_items,
        customer_email: "test@gmail.com",
      });

      const { sessionId } = res.data;
      console.log(sessionId);
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      setError(err);
      window.location.replace("/login");
      localStorage.removeItem("persist:root");
    }
  };

  const handleDelete = (id) => {
    dispatch(productDeleted({ id }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Title>Your Bag</Title>
      <Top>
        <TopButton>CONTINUE SHOPPING</TopButton>
        <TopTexts>
          <TopText>Shopping Bag({cart.quantity})</TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
        <TopButton type="filled">CHECKOUT NOW </TopButton>
      </Top>

      <Bottom>
        <Info>
          {cart.products.map((product) => (
            <Product key={product._id}>
              <Image src={product.img} />
              <ProductDetails>
                <ProductInfo>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </ProductInfo>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => dispatch(increaseQty(product._id))} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove
                      onClick={() => dispatch(decreaseQty(product._id))}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price}</ProductPrice>
                  <Delete onClick={() => handleDelete(product._id)}>
                    Delete
                  </Delete>
                </PriceDetail>
              </ProductDetails>
            </Product>
          ))}
        </Info>

        <Summary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Bag Total</SummaryItemText>
            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>$5.90</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Discount </SummaryItemText>
            <SummaryItemPrice> -$5.90</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total Amount</SummaryItemText>
            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
          </SummaryItem>

          <SummaryButton onClick={handleCheckout}>
            Process To Shipping
          </SummaryButton>
          {error && <ErrorMsg>Unauthorized Access</ErrorMsg>}
        </Summary>
      </Bottom>
    </Container>
  );
}

export default Cart;
