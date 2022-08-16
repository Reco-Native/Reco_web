import React from 'react'
import styled from "styled-components";
import Header from "../../component/Nav/Header";
import { SectionStyles } from "../../style/styles.";

const Section = styled.section`
  ${SectionStyles}
`;

const User = () => {
  return (
    <Section>
      <Header title={"User"} />
    </Section>
  );
}

export default User