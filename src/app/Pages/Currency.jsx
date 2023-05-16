import React, { useEffect, useMemo } from 'react';
import Header from '../../component/Nav/Header';
import styled from 'styled-components';
import { SectionStyles } from '../../style/styles.';
import { Input, Select } from 'antd';
// import Button from '../../component/FormElements/Button';
// import Input from '../../component/FormElements/Input';
// import Select from '../../component/FormElements/Select';
import Modal from '../../component/Modal/Modal';
import { ThemeContextAPI } from '../../context/useContext';
import Data from '../../api/country.json';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCurrency, AllCurrency } from '../../store/services/currency';
import { Notification } from '../../component/Notification/Notification';
import { clearMessage } from '../../store/slice/messageSlice';

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
  const dispatch = useDispatch();
  const { isCreating, currencies, isFetching } = useSelector((state) => state.currency);
  const { message } = useSelector((state) => state.message);

  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  async function handleCountryChange(data, e) {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        country: e,
      },
    }));
  }

  const handleCreateCard = async (e) => {
    e.preventDefault();
    const { country } = formdata.controls;
    const findCurrency = currencies && currencies.length > 0 && currencies.find((c) => c.name === country.label);

    if (findCurrency && findCurrency.name) {
      return Notification({
        type: 'warning',
        message: 'Country already exist',
      });
    }
    const data = {
      name: country.label,
      currency: country.currency,
    };

    dispatch(CreateCurrency({ data, setShowModal, setFormdata }));
  };

  const FetchCurrencies = () => {
    const data = '';
    dispatch(AllCurrency({ data }));
  };

  useEffect(() => {
    FetchCurrencies();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && message !== '' && showModal) {
      if (message === 'Currency Created Succesfully') {
        Notification({
          type: 'success',
          message,
        });
      } else {
        Notification({
          type: 'error',
          message,
        });
      }
    }

    return () => {
      dispatch(clearMessage());
      mounted = false;
    };
  }, [message, dispatch, showModal]);

  const UseList = useMemo(() => {
    return (
      Data.length > 0 &&
      Data.map((item) => {
        return {
          label: item.name,
          value: item.name,
          key: item.iso2,
          currency: item.currency,
        };
      })
    );
  }, []);

  return (
    <>
      <Modal
        open={showModal}
        handleCancel={() => setShowModal(false)}
        handleSumbit={handleCreateCard}
        title={'Add Currency'}
        loading={isCreating === 'loading'}
      >
        <FormContainer className="formContainer">
          <form onSubmit={handleCreateCard}>
            <div>
              <label>Select Country </label>
              <Select
                name={'country'}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase()?.includes(input.toLowerCase())}
                options={UseList}
                onChange={(data, e) => handleCountryChange(data, e)}
                style={{ height: '45px', width: '100%' }}
              />
            </div>
            <div>
              <label>Country Currency: Populated Automatically</label>
              <Input
                type="text"
                label="Currency"
                name="currency"
                value={formdata?.controls?.country?.currency}
                style={{ height: '40px' }}
                disabled
              />
            </div>
          </form>
        </FormContainer>
      </Modal>
      <Section>
        <Header title={'Currency'} addCurrency handleShowModal={handleShowModal} />

        <main className="main">
          {isFetching === 'laoding' ? (
            'Laoding'
          ) : (
            <Conatiner>
              {currencies && currencies.length > 0 ? (
                currencies?.map((item) => (
                  <Card key={item.id}>
                    <p> Country: {item.name}</p>
                    <p> Currency: {item.currency}</p>
                  </Card>
                ))
              ) : (
                <div>
                  <h4>No Country/Currency Found</h4>
                </div>
              )}
            </Conatiner>
          )}
        </main>
      </Section>
    </>
  );
};

export default Currency;
