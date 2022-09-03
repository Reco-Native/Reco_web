import React, { useEffect } from "react";
import Header from "../../component/Nav/Header";
import styled from "styled-components";
import { SectionStyles } from "../../style/styles.";
import Modal from "../../component/Modal/Modal";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import Input from "../../component/FormElements/Input";
import { ThemeContextAPI } from "../../context/useContext";
import Button from "../../component/FormElements/Button";
import Selects from "../../component/FormElements/Select";
import {
  useAddNewCardMutation,
  useDeleteCardMutation,
  useGetCardsMutation,
} from "../../store/services/createCard";
import { useGetCurrencyMutation } from "../../store/services/fetchCurrency";
import { useCallback } from "react";
import IconsMain from "../../component/Icon";

const Section = styled.section`
  ${SectionStyles}
`;

const FormContainer = styled.div`
  padding: 2rem;

  .btnContianer {
    margin-top: 2rem;
  }
`;

const CardType = [
  {
    id: 1,
    name: "ECode",
  },
  {
    id: 2,
    name: "Physical",
  },
];

const Cardcategory = [
  {
    id: 1,
    name: "10-50",
  },
  {
    id: 2,
    name: "51-100",
  },
  {
    id: 3,
    name: "101-200",
  },
];

const Giftcard = () => {
  const [addNewCard, { isSuccess, isLoading, isError }] =
    useAddNewCardMutation();
  const [getCards, { data: AllCards }] = useGetCardsMutation();
  const [deleteCard] = useDeleteCardMutation();
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const userRef = React.useRef();
  const Query = useMediaQuery("(min-width: 66rem)");
  const [showModal, setShowModal] = React.useState(false);
  const [useCurrency, setUseCurrency] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [pic, setPic] = React.useState("");

  function handleImage(event) {
    const img = event.target.files[0];
    setPic(URL.createObjectURL(img));
  }

  const [getCurrency, { data }] = useGetCurrencyMutation();

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

  const handleDeleteCard = async (id) => {
    await deleteCard(id);
      await getCards();
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();

    const { cardName, cardType, category, rmb, country, cardRate, profit } =
      formdata.controls;
    const current = useCurrency.currency;
    const ID = useCurrency.id;
    const image = pic;

    const form = {
      name: cardName,
      type: cardType,
      category: category,
      country: {
        id: ID,
        name: country,
        currency: current,
      },
      rmbRate: rmb,
      cardRate: cardRate,
      profit: profit,
      image: image,
    };

    await addNewCard(form);
    await getCards()
  };

  React.useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    async function fetchCurrency() {
      await getCurrency();
      await getCards();
    }
    fetchCurrency();
  }, []);

  const findCurrency = useCallback(async () => {
    const country = formdata.controls.country;
    const currency = data.find((item) => item.name === country);
    setUseCurrency(currency);
  }, [data, formdata.controls.country]);

  const calculateRate = useCallback(() => {
    const rmb = formdata.controls.rmb;
    const cardRate = formdata.controls.cardRate;
    const profit = formdata.controls.profit;
    let usedValue;
    if (rmb && cardRate && profit) {
      usedValue = parseFloat(rmb) * parseFloat(cardRate) - parseFloat(profit);
    }

    setRate(usedValue?.toFixed(0));
  }, [
    formdata.controls.cardRate,
    formdata.controls.profit,
    formdata.controls.rmb,
  ]);

  useEffect(() => {
    calculateRate();
  }, [calculateRate]);

  useEffect(() => {
    findCurrency();
  }, [findCurrency]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      if (isSuccess) {
        alert("New card Added");
        setUseCurrency("");
        setRate("");
        setShowModal((prev) => !prev);

        setFormdata((s) => ({
          ...s,
          controls: {
            ...s,
            cardName: "",
            cardType: "",
            category: "",
            rmb: "",
            country: "",
            cardRate: "",
            profit: "",
          },
        }));
      }
      if (isError) {
        alert("Something went wrong. Please try again.");
      }
    }

    return () => (mount = false);
  }, [isSuccess, isError]);

  console.log(pic);

  return (
    <>
      <Modal
        show={showModal}
        setShow={setShowModal}
        top="5vh"
        transition={{ duration: 0.5, type: { type: "spring" } }}
        background={"var(--color-primary)"}
        initial={{ scale: 0.5, opacity: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        theme="rgba(0, 0, 0, .7)"
        padding="0"
        overFlow={"auto"}
        height={Query ? "90%" : "90%"}
        left={Query ? "30%" : "5%"}
        width={Query ? "50%" : "90%"}
        borderradius="2px"
        zindex="99"
        btn
      >
        <FormContainer className="formContainer">
          <form onSubmit={handleCreateCard}>
            <Input
              type="text"
              label="Card Name"
              name="cardName"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              ref={userRef}
              value={formdata.controls.cardName}
              onChange={handleInputChange}
            />
            <Selects
              name={"cardType"}
              label="Card Type"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              flex={"1"}
              option={CardType}
              value={formdata.controls.cardType}
              onChange={handleInputChange}
              defaults="--Select Card Type--"
            />
            <Selects
              name={"category"}
              label="Card Category"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              flex={"1"}
              option={Cardcategory}
              value={formdata.controls.category}
              onChange={handleInputChange}
              defaults="--Select Card Category--"
            />
            <Selects
              name={"country"}
              label="Country"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              flex={"1"}
              option={data}
              value={formdata.controls.country}
              onChange={handleInputChange}
              defaults="--Select Country--"
            />
            <Input
              type="text"
              label="Currency"
              name="currency"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={useCurrency?.currency}
              readOnly
            />
            <Input
              type="number"
              label="RMB"
              name="rmb"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={formdata.controls.rmb}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              label="Card Rate"
              name="cardRate"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={formdata.controls.cardRate}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              label="Profit"
              name="profit"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={formdata.controls.profit}
              onChange={handleInputChange}
            />

            <Input
              type="number"
              label="Rate"
              name="rate"
              height={"50px"}
              focusColor={"var(--color-secondary)"}
              focusBg="#fefeff"
              value={rate}
              readOnly
            />

            <input
              type="file"
              label="Image"
              name="image"
              height={"50px"}
              onChange={handleImage}
            />
            <div className="btnContianer">
              <Button
                text={isLoading ? "Loading" : "Create card"}
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
          title={"Gift card"}
          Giftcard
          handleShowModal={handleShowModal}
        />
        <main>
          <GiftContainer className="snaps-inline ">
            {AllCards?.map((item) => (
              <GiftCard>
                <img src={item?.image} alt="card" width="100px" />
                <p>{item.name}</p>
                <span
                  className="Delete"
                  onClick={() => handleDeleteCard(item.id)}
                >
                  <IconsMain icon="ant-design:delete-outlined" />
                </span>
              </GiftCard>
            ))}
          </GiftContainer>
        </main>
      </Section>
    </>
  );
};

export default Giftcard;

const GiftContainer = styled.div`
  --_spacer: var(--size-3);
  display: grid;
  gap: var(--_spacer);
  grid-auto-flow: column;
  grid-auto-columns: 50%;

  padding: 0 var(--_spacer) var(--_spacer);

  overflow-x: auto;
  overscroll-behavior-inline: contain;

  .snaps-inline {
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: var(--_spacer, 1rem);
  }

  .snaps-inline > * {
    scroll-snap-align: start;
  }
`;
const GiftCard = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: min-content;
  gap: var(--_spacer);
  padding: var(--_spacer);
  background: var(--surface-2);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-2);
  position: relative;
  background-color: #fff;
  height: 250px;
  > {
    inline-size: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  /* border-radius: 5px;
  padding: 10px; */

  .Delete {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid var(--color-main);
    border-radius: 50px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      background-color: var(--color-main);
      opacity: 0.7;
    }
  }
`;
