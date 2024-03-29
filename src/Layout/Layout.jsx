import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import SideBar from "../component/SideBar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Nav from "../component/Nav/Nav";

const LayoutContainer = styled.div`
  display: block;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: all 0.5s;

  @media screen and (min-width: 1025px) {
    display: grid;
  }
`;

const Container = styled.div`
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
`;

const Layout = () => {
  const { navtoggle } = useSelector((state) => state.component);

  return (
    <React.Fragment>
      <LayoutContainer
        grid={navtoggle ? 'true' : 'false'}
        as={motion.div}
        initial={{ gridTemplateColumns: "250px 1fr" }}
        animate={{ gridTemplateColumns: navtoggle ? "65px 1fr" : "250px 1fr" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <SideBar />
        <Container>
          <Nav />
          <Outlet />
        </Container>
      </LayoutContainer>
    </React.Fragment>
  );
};

export default Layout;
