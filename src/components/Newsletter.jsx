import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { device } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 10rem;
  color: #495057;
  @media ${device.tablet} {
    font-size: 5rem;
    text-align: center;
  }
`;
const Desc = styled.p`
  font-size: 3rem;
  font-weight: 300;
  color: #495057;
  @media ${device.tablet} {
    text-align: center;
  }
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 50%; */
  height: 40px;
  background-color: white;
  /* border: 1px solid lightgray; */
`;
const Input = styled.input`
  flex: 8;
  padding-left: 1rem;
  outline: none;
  border: none;
  font-size: 2rem;
  height: 100%;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  outline: none;
  background-color: teal;
  color: white;
  height: 100%;
  cursor: pointer;
`;

function Newsletter(props) {
  return (
    <Container>
      <Info>
        <Title>Newsletter</Title>
        <Desc>Get Timely Updates From Your Favorite Products</Desc>
        <InputContainer>
          <Input />
          <Button>
            <SendIcon style={{ fontSize: "3rem" }} />
          </Button>
        </InputContainer>
      </Info>
    </Container>
  );
}

export default Newsletter;
