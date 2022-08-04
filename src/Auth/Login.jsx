import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import FormAdmin from "./FormAdmin";

const Section = styled.section`
  position: relative;
  z-index: 1;
  background-color: var(--color-white);

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  @media screen and (min-width: 55rem) {
    .container {
      width: 40%;
    }
  }
`;

const Card = styled.div`
  box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
  background-color: #fff;
  border-radius: 3px;
  border: none;
  position: relative;
  margin-bottom: 30px;
  border-top: 2px solid var(--color-secondary);
  margin-top: 200px !important;
  border-radius: 3px;

  .card-head {
    border-bottom-color: #f9f9f9;
    line-height: 30px;
    -ms-grid-row-align: center;
    align-self: center;
    width: 100%;
    min-height: 54px;
    padding: 15px 25px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: var(--font-xtraSmaller);
      line-height: 28px;
      color: var(--color-secondary);
      padding-right: 10px;
      margin-bottom: 0;
    }

    a {
      color: var(--color-secondary);
      font-weight: 500;
    }
  }

  .card-body {
    background-color: transparent;
    padding: 20px 25px;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }
`;

const Login = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  return (
    <Section>
      <div className="container">
        <Card>
          <div className="card-head">
            <h4>Admin Login</h4>
            <Link to="/">Home</Link>
          </div>
          <div className="card-body">
            <FormAdmin />
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Login;
