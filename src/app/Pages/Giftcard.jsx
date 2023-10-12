import React, { useCallback, useEffect, useMemo } from 'react';
import Header from '../../component/Nav/Header';
import styled from 'styled-components';
import { SectionStyles } from '../../style/styles.';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGiftCard, DeleteCard, GetCards } from '../../store/services/giftCard';
import Modal from '../../component/Modal/Modal';
// import useMediaQuery from '../../hooks/useMediaQuery/useMediaQuery';
import { Input, Select } from 'antd';
import { ThemeContextAPI } from '../../context/useContext';
// import Button from '../../component/FormElements/Button';

import IconsMain from '../../component/Icon';
import { clearMessage } from '../../store/slice/messageSlice';
import { Notification } from '../../component/Notification/Notification';

const Section = styled.section`
  ${SectionStyles}
  height: unset;
`;

const FormContainer = styled.div`
  padding: 2rem;

  .btnContianer {
    margin-top: 2rem;
  }
`;

const CardType = [
  {
    key: 1,
    label: 'ECode',
    value: 'Ecode',
  },
  {
    key: 2,
    label: 'Physical',
    value: 'Physical',
  },
];

const Cardcategory = [
  {
    id: 1,
    name: '10-50',
  },
  {
    id: 2,
    name: '51-100',
  },
  {
    id: 3,
    name: '101-200',
  },
];

const Giftcard = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { message } = useSelector((state) => state.message);
  const { isGetting, giftcards, isCreating } = useSelector((state) => state.giftcard);

  useEffect(() => {
    const getCard = () => {
      const data = '';
      dispatch(GetCards({ data }));
    };

    getCard();
  }, [dispatch]);

  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const userRef = React.useRef();
  const [showModal, setShowModal] = React.useState(false);
  const [rate, setRate] = React.useState('');

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleInputChange = (data, value, name) => {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: !value ? data.target.value : value,
      },
    }));
  };

  const handleDeleteCard = async (id) => {
    const data = Number(id);
    dispatch(DeleteCard({ data }));
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();

    const { cardName, cardType, category, rmb, cardRate, profit, image } = formdata.controls;

    const data = {
      name: cardName,
      type: cardType?.label,
      category: categories?.find((c) => parseInt(c.id) === parseInt(category.key)),

      rmbRate: rmb,
      cardRate: cardRate,
      profit: profit,
      image: image,
    };

    dispatch(CreateGiftCard({ data, setShowModal, setFormdata }));
  };

  React.useEffect(() => {
    userRef?.current?.focus();
  }, []);

  const CategoryList = useMemo(() => {
    return categories && categories.length > 0
      ? categories.map((item) => {
          return {
            label: item.categoryName,
            key: item.id,
            value: item.categoryName,
            country: item.country,
          };
        })
      : [];
  }, [categories]);

  const calculateRate = useCallback(() => {
    const rmb = formdata.controls.rmb;
    const cardRate = formdata.controls.cardRate;
    const profit = formdata.controls.profit;
    let usedValue;
    if (rmb && cardRate && profit) {
      usedValue = parseFloat(rmb) * parseFloat(cardRate) - parseFloat(profit);
    }

    setRate(usedValue?.toFixed(0));
  }, [formdata.controls.cardRate, formdata.controls.profit, formdata.controls.rmb]);

  useEffect(() => {
    calculateRate();
  }, [calculateRate]);

  useEffect(() => {
    let mounted = true;
    if (mounted && message !== '') {
      if (message === 'GiftCard Created Succesfully') {
        Notification({
          type: 'success',
          message,
        });
      } else if (message === 'Card Deleted Successfully') {
        Notification({
          type: 'success',
          message,
        });
      } else if ((message && message?.status === 500) || (message && message?.status === 401)) {
        if (message === undefined || message === 'undefined') return;
        Notification({
          type: 'error',
          message: 'Something went wrong',
        });
      }
    }

    return () => {
      dispatch(clearMessage());
      mounted = false;
    };
  }, [message, dispatch, showModal]);

  return (
    <>
      <Modal
        open={showModal}
        handleCancel={() => setShowModal(false)}
        title="Add GiftCard"
        handleSumbit={handleCreateCard}
        loading={isCreating === 'loading'}
      >
        <FormContainer className="formContainer">
          <form onSubmit={handleCreateCard}>
            <div style={{ margin: '1rem 0' }}>
              <label>Card Name</label>
              <Input
                type="text"
                name="cardName"
                ref={userRef}
                value={formdata.controls.cardName}
                onChange={(data, value) => handleInputChange(data, value, 'cardName')}
                style={{ width: '100%', height: '40px' }}
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label>Card Type</label>
              <Select
                name={'cardType'}
                options={CardType}
                value={formdata.controls.cardType}
                onChange={(data, value) => handleInputChange(data, value, 'cardType')}
                style={{ width: '100%', height: '40px' }}
              />
            </div>

            <div style={{ margin: '1rem 0' }}>
              <label>Category</label>
              <Select
                name={'category'}
                options={CategoryList}
                value={formdata.controls.category}
                onChange={(data, value) => handleInputChange(data, value, 'category')}
                style={{ width: '100%', height: '40px' }}
              />
            </div>

            {/* <div style={{ margin: '1rem 0' }}>
              <label>Country </label>
              <Select
                name={'country'}
                options={[]}
                value={formdata.controls.country}
                onChange={handleInputChange}
                style={{ width: '100%', height: '40px' }}
              />
            </div> */}
            <div style={{ margin: '1rem 0' }}>
              <label>Currency</label>
              <Input
                type="text"
                name="currency"
                style={{ width: '100%', height: '40px' }}
                value={formdata?.controls?.category?.country?.currency}
                readOnly
                disabled
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label>RMB Rate</label>
              <Input
                type="number"
                name="rmb"
                style={{ width: '100%', height: '40px' }}
                value={formdata.controls.rmb}
                onChange={(data, value) => handleInputChange(data, value, 'rmb')}
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label>Card Rate</label>
              <Input
                type="number"
                name="cardRate"
                style={{ width: '100%', height: '40px' }}
                value={formdata.controls.cardRate}
                onChange={(data, value) => handleInputChange(data, value, 'cardRate')}
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label>Profit</label>
              <Input
                type="number"
                name="profit"
                style={{ width: '100%', height: '40px' }}
                value={formdata.controls.profit}
                onChange={(data, value) => handleInputChange(data, value, 'profit')}
              />
            </div>

            <div style={{ margin: '1rem 0' }}>
              <label>Rate</label>
              <Input
                type="number"
                name="rate"
                style={{ width: '100%', height: '40px' }}
                value={rate}
                readOnly
                disabled
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label>Image URL</label>
              <Input
                type="text"
                name="image"
                style={{ width: '100%', height: '40px' }}
                onChange={(data, value) => handleInputChange(data, value, 'image')}
                value={formdata.controls.image}
              />
            </div>
          </form>
        </FormContainer>
      </Modal>
      <Section>
        <Header title={'Gift card'} Giftcard handleShowModal={handleShowModal} />
        <main>
          {isGetting === 'loading' ? (
            'loading'
          ) : (
            <GiftContainer className="snaps-inline ">
              {giftcards && giftcards.length > 0
                ? giftcards?.map((item) => (
                    <GiftCard key={item.id}>
                      <img src={item?.image} alt="card" width="100px" className="image" />
                      <p>{item.name}</p>
                      <span className="Delete" onClick={() => handleDeleteCard(item.id)}>
                        <IconsMain icon="ant-design:delete-outlined" />
                      </span>
                    </GiftCard>
                  ))
                : 'No Card Found'}
            </GiftContainer>
          )}
        </main>
      </Section>
    </>
  );
};

export default Giftcard;

const GiftContainer = styled.div`
  --_spacer: var(--size-3);
  /* display: grid;
  gap: var(--_spacer);
  grid-auto-flow: column;
  grid-auto-columns: 50%; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 var(--_spacer) var(--_spacer);
  /* 
  overflow-x: auto;
  overscroll-behavior-inline: contain; */

  /* .snaps-inline {
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: var(--_spacer, 1rem);
  }

  .snaps-inline > * {
    scroll-snap-align: start;
  } */
`;
const GiftCard = styled.div`
  position: relative;
  /* display: grid; */
  /* grid-template-rows: min-content; */
  gap: var(--_spacer);
  padding: var(--_spacer);
  background: transparent;
  /* border-radius: var(--radius-2); */
  /* box-shadow: var(--shadow-2); */
  position: relative;
  background-color: transparent;
  height: 220px;
  /* width: 400px;
    max-width: 400px;  */
  > {
    inline-size: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  /* border-radius: 5px;
  padding: 10px; */

  .Delete {
    position: absolute;
    right: 25px;
    top: 20px;
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

  .image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
