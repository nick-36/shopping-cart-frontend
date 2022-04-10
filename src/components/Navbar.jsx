import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Badge } from "@material-ui/core";
import { device } from "../responsive";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../Store/userSlice";

const Container = styled.div`
  height: 60px;
  font-size: 2rem;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  @media ${device.tablet} {
    display: none;
  }
`;
const Language = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 5px;
  font-size: 2rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 1.5rem;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  @media ${device.tablet} {
    text-align: start;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media ${device.tablet} {
    flex: 3;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  margin-left: 2rem;
`;

function Navbar(props) {
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogOut = () => {
    localStorage.removeItem("persist:root");

    dispatch(logoutSuccess());

    navigate({ pathname: "/login" });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            EN
            <SearchContainer>
              <Input />
              <SearchIcon
                style={{ color: "gray", fontSize: "2rem", cursor: "pointer" }}
              />
            </SearchContainer>
          </Language>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "#111111" }}>
            AXIOS.
          </Link>
        </Center>
        <Right>
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "teal" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "teal" }}
              >
                <MenuItem>Sign In</MenuItem>
              </Link>
            </>
          ) : (
            <MenuItem
              onClick={handleLogOut}
              style={{ textDecoration: "none", color: "teal" }}
            >
              LOG OUT
            </MenuItem>
          )}
          <Link to="/cart">
            <MenuItem>
              {isAuthenticated && (
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon style={{ fontSize: "2rem" }} />
                </Badge>
              )}
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
