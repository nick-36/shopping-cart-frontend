import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { device } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

function Categories(props) {
  return (
    <Container>
      {categories.map((item) => {
        return <CategoryItem key={item.id} item={item} />;
      })}
    </Container>
  );
}

export default Categories;
