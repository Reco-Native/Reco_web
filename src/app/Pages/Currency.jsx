import React, { useEffect } from "react";
import Header from "../../component/Nav/Header";
import styled from "styled-components";
import { SectionStyles } from "../../style/styles.";
import Button from "../../component/FormElements/Button";
import Input from "../../component/FormElements/Input";
import Select from "../../component/FormElements/Select";
import Modal from "../../component/Modal/Modal";
import { ThemeContextAPI } from "../../context/useContext";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { useAddNewCurrencyMutation } from "../../store/services/createCurrency";
import { useGetCurrencyMutation } from "../../store/services/fetchCurrency";
import Data from "../../api/country.json";
import { useCallback } from "react";

const Section = styled.section`
  ${SectionStyles}

  .main {
    padding: 1em 2em;
  }
`;
const FormContainer = styled.div`
  padding: 2rem;

  .btnContianer {
    margin-top: 2rem;
  }
`;

const Card = styled.div`
  box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
  background-color: var(--color-main);
  border-radius: 3px;
  border: none;
  position: relative;
  margin-bottom: 30px;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  padding: 10px;
`;

const Conatiner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

`;

const Currency = () => {
  const [addNewCurrency, { isLoading, isSuccess, isError }] =
    useAddNewCurrencyMutation();
  const [getCurrency, { data }] = useGetCurrencyMutation();
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const [showModal, setShowModal] = React.useState(false);
  const Query = useMediaQuery("(min-width: 66rem)");
  const [state, setState] = React.useState({
    country: "Afghanistan",
  });

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: value,
      },
    }));
  };

  async function handleCountryChange(event) {
    const country = event.target.value;

    if (country === "") {
      await setState((s) => ({
        ...s,
        country: "",
      }));
      return false;
    } else {
      const selectedCountry = Data.filter(
        (country_) => country_.name === country
      )[0];

      await setState((s) => ({
        ...s,
        country: selectedCountry.name,
        phoneC: selectedCountry.dial_code,
      }));
    }
  }

  const handleCreateCard = async (e) => {
    e.preventDefault();
    const { currency } = formdata.controls;

    const form = {
      name: state.country,
      currency: currency,
    };
    await addNewCurrency(form);
    await getCurrency();
  };

  const GetAllCurrency = useCallback(async () => {
    await getCurrency();
  }, []);

  useEffect(() => {
    GetAllCurrency();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (isSuccess) {
        alert("Country Created Successfully");
        setFormdata((s) => ({
          ...s,
          controls: {
            ...s,
            currency: "",
          },
        }));
        setShowModal((prev) => !prev);
      }
      if (isError) {
        alert("Something went wrong.Please try again");
      }
    }

    return () => (mounted = false);
  }, [isSuccess, isError, setFormdata]);
  return (
    <>
      <Modal
        show={showModal}
        setShow={setShowModal}
        top="15vh"
        transition={{ duration: 0.5, type: { type: "spring" } }}
        background={"var(--color-primary)"}
        initial={{ scale: 0.5, opacity: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        theme="rgba(0, 0, 0, .7)"
        padding="0"
        overFlow={"auto"}
        left={Query ? "30%" : "5%"}
        width={Query ? "50%" : "90%"}
        borderradius="2px"
        zindex="99"
      >
        <FormContainer className="formContainer">
          <form onSubmit={handleCreateCard}>
            <Select
              label={"Country"}
              name={"country"}
              height={"50px"}
              color="var( --color-header-two)"
              focusColor={"#ffc107"}
              option={Data}
              onChange={handleCountryChange}
              flex={"1"}
              defaults="--Select Country--"
            />
            <Input
              type="text"
              label="Currency"
              name="currency"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={formdata.controls.currency}
              onChange={handleInputChange}
            />

            <div className="btnContianer">
              <Button
                text={isLoading ? "Loading" : "Create Card"}
                background={"#fff"}
                boxShadow="none"
                color={"#333"}
                width="100%"
                height={"50px"}
                disabled={isLoading}
              />
            </div>
          </form>
        </FormContainer>
      </Modal>
      <Section>
        <Header
          title={"Currency"}
          addCurrency
          handleShowModal={handleShowModal}
        />

        <main className="main">
          <Conatiner>
            {data?.map((item) => (
              <Card>{item.name}</Card>
            ))}
          </Conatiner>
        </main>
      </Section>
    </>
  );
};

export default Currency;
