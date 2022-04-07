import styled from "styled-components";
import { device } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
`;
const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);

  @media ${device.laptop} {
    width: 60%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 2rem;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border: 2px solid lightgray;
  outline: none;
  border-radius: 10px;
  min-width: 40%;
`;

const Agreement = styled.span`
  font-size: 1.4rem;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 1rem auto;
  border-radius: 10px;
`;

function Register(props) {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        <Form>
          <Input type="text" placeholder="first name" />
          <Input type="text" placeholder="last name" />
          <Input type="text" placeholder="username" />
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Input type="passowrd" placeholder="confirm password" />
        </Form>
        <Agreement>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement>
        <Button>CREATE</Button>
      </Wrapper>
    </Container>
  );
}

export default Register;
