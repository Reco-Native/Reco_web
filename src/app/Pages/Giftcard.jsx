import React from "react";
import Header from "../../component/Nav/Header";
import styled from "styled-components";
import { SectionStyles } from "../../style/styles.";

const Section = styled.section`
  ${SectionStyles}
`;

const Giftcard = () => {
  return (
    <Section>
      <Header title={"Gift card"} Giftcard/>
    </Section>
  );
};

export default Giftcard;
