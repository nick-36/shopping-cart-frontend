import React from "react";
import styled from "styled-components";
import { device } from "../responsive";

import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";

const Container = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4rem 1rem;

  @media ${device.tablet} {
    align-items: center;
    text-align: center;
  }
`;

const Right = styled.div`
  flex: 1;
  font-size: 1.5rem;
  margin: 4rem 2rem;

  @media ${device.tablet} {
    background-color: aliceblue;
    margin: 0;
  }
`;

const ContactItem = styled.div`
  margin: 2rem;

  display: flex;
  align-items: center;

  @media ${device.tablet} {
    margin: 2rem 0;
  }
`;

const Payment = styled.img`
  width: 50%;
  margin-left: 2rem;
`;
const Logo = styled.h1`
  font-size: 5rem;
`;
const Desc = styled.p`
  font-size: 1.5rem;

  margin: 20px 0px;
`;
const Title = styled.h2`
  font-size: 2rem;
  /* text-align: center; */
`;
const SocialIconContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
const SocialIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
`;

const Center = styled.div`
  flex: 1;

  margin: 4rem 2rem;
  /* background-color: teal; */
  @media ${device.tablet} {
    display: none;
  }
`;
const List = styled.ul`
  margin-top: 2rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 1.6rem;
  cursor: pointer;
`;

function Footer(props) {
  return (
    <Container>
      <Left>
        <Logo>AJIO.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialIconContainer>
          <SocialIcon color="3B5999">
            <Facebook
              style={{ width: "24px", height: "24px", color: "#fff" }}
            />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram
              style={{ width: "24px", height: "24px", color: "#fff" }}
            />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter style={{ width: "24px", height: "24px", color: "#fff" }} />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest
              style={{ width: "24px", height: "24px", color: "#fff" }}
            />
          </SocialIcon>
        </SocialIconContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South
          Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@xyz.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
