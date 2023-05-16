import React, { useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { SectionStyles } from '../../style/styles.';
import Header from '../../component/Nav/Header';
import { Input, Select } from 'antd';
import { ThemeContextAPI } from '../../context/useContext';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../component/Modal/Modal';
import { GetCategories, PostCategory } from '../../store/services/category.js';
import { clearMessage } from '../../store/slice/messageSlice';
import { Notification } from '../../component/Notification/Notification';

const Section = styled.section`
  ${SectionStyles}

  .main {
    padding: 1em 2em;
  }
`;

const Category = () => {
  const dispatch = useDispatch();
  const { categories, isPosting, isGetting } = useSelector((state) => state.category);
  const { currencies } = useSelector((state) => state.currency);
  const { message } = useSelector((state) => state.message);

  const { setFormdata, formdata } = useContext(ThemeContextAPI);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const FetchCategories = () => {
    const data = '';
    dispatch(GetCategories({ data }));
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  const handleCreateCard = async (e) => {
    e.preventDefault();
    const { categoryName: name, category } = formdata.controls;
    const data = {
      categoryName: name,
      country: {
        id: category.key,
        name: category.label,
        currency: category.currency,
      },
    };

    dispatch(PostCategory({ data, setShowModal, setFormdata }));
  };
  const handleInputChange = (data, e, name) => {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: !e ? data.target.value : e,
      },
    }));
  };

  const ListCategory = useMemo(() => {
    return currencies && currencies.length > 0
      ? currencies.map((item) => {
          return {
            label: item.name,
            value: item.name,
            key: item.id,
            currency: item.currency,
          };
        })
      : [];
  }, [currencies]);

  useEffect(() => {
    let mounted = true;
    if (mounted && message !== '' && showModal) {
      if (message === 'Category Created Succesfully') {
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
  return (
    <Section>
      <Modal
        open={showModal}
        handleCancel={() => setShowModal(false)}
        handleSumbit={handleCreateCard}
        title={'Add Category'}
        loading={isPosting === 'loading' ? true : false}
      >
        <div>
          <div style={{ margin: '1rem 0' }}>
            <label>Category Name</label>
            <Input
              label="Category Name"
              name="catgoryName"
              height={'50px'}
              value={formdata.controls.catgoryName}
              onChange={(data, e) => handleInputChange(data, e, 'categoryName')}
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <label>Select Category</label>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').toLowerCase()?.includes(input.toLowerCase())}
              name={'category'}
              options={ListCategory}
              style={{ height: '45px', width: '100%' }}
              onChange={(data, e) => handleInputChange(data, e, 'category')}
            />
          </div>
        </div>
      </Modal>
      <Header title={'Category'} addCurrency handleShowModal={handleShowModal} btnTitle="Add  Category" />
      <main className="main">
        {isGetting === 'loading' ? (
          'Laoding'
        ) : (
          <Conatiner>
            {categories && categories.length > 0 ? (
              categories?.map((item) => (
                <Card key={item.id}>
                  <p> Name: {item?.categoryName}</p>
                  <p> Country: {item?.country?.name}</p>
                  <p>Currency: {item?.country?.currency}</p>
                </Card>
              ))
            ) : (
              <div>
                <h4>No Category Found</h4>
              </div>
            )}
          </Conatiner>
        )}
      </main>
    </Section>
  );
};

export default Category;

const Conatiner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
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
