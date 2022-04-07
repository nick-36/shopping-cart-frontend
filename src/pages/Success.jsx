import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Message = styled.h1`
  font-size: 5rem;
  color: teal;
`;

function Success(props) {
  return (
    <Container>
      <Message>Your order has been placed Successfully</Message>
    </Container>
  );
}

export default Success;
