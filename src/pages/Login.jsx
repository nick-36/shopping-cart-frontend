import styled from "styled-components";
import { device } from "../responsive";

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../Store/userSlice";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1)
    ),
    url("https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")
      center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
  border-radius: 10px;

  @media ${device.laptop} {
    width: 60%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  border: 1px solid lightgray;

  border-radius: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Error = styled.span`
  font-size: 1.6rem;
  color: red;
`;

const BtnLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonExplore = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const redirectPath = location.state?.path || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);

      dispatch(loginSuccess(res.data));

      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
    }
  };
  return (
    <Container>
      <Link to="/">
        <ButtonExplore>Explore</ButtonExplore>
      </Link>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            name="username"
            onChange={handleChange}
            type="text"
            value={user.username}
          />
          <Input
            placeholder="password"
            name="password"
            onChange={handleChange}
            type="password"
            value={user.password}
          />
          <Button onClick={handleLogin}>LOGIN</Button>
          {error && <Error>Something Went Wrong....</Error>}
          <BtnLink>DO NOT YOU REMEMBER THE PASSWORD?</BtnLink>
          <BtnLink>CREATE A NEW ACCOUNT</BtnLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
