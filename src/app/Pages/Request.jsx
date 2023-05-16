import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SectionStyles } from '../../style/styles.';
import Header from '../../component/Nav/Header';
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequests, UpdateRequest } from '../../store/services/request';
import Modal from '../../component/Modal/Modal';
import { ThemeContextAPI } from '../../context/useContext';

const Section = styled.section`
  ${SectionStyles}
`;

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'CategoryName',
    dataIndex: 'categoryname',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
  },
  {
    title: 'Quantity',
    dataIndex: 'Quantity',
  },
];

const Request = () => {
  const dispatch = useDispatch();
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);

  const { allrequest, isGetting, isUpdating } = useSelector((state) => state.request);
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);

  const handleInputChange = (data, value, name) => {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: !value ? data.target.value : value.label,
      },
    }));
  };
  useEffect(() => {
    const fetchTran = () => {
      const data = '';
      dispatch(GetRequests({ data }));
    };

    fetchTran();
  }, []);

  const TableData = useMemo(() => {
    return allrequest && allrequest.length > 0
      ? allrequest.map((item) => {
          return {
            key: item.id,
            date: new Date(item.requestDate).toLocaleString(),
            name: item?.giftCard?.name,
            type: item.type,
            amount: item.amount,
            categoryname: item?.giftCard?.category?.categoryName,
            country: item?.giftCard?.category?.country?.name,
            currency: item?.giftCard?.category?.country?.currency,
            rate: item?.giftCard?.rate,
            profit: item?.giftCard?.profit,
            quantity: item.quantity,
          };
        })
      : [];
  }, [allrequest]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
  };

  useEffect(() => {
    if (selectedRowKeys && selectedRowKeys.length > 0 && !isNaN(selectedRowKeys[0])) {
      const filterData = allrequest.filter((item) => item.id === selectedRowKeys[0]);
      if (filterData?.length > 0) {
        setResults(filterData);
      }

      setShowModal(true);
    }
  }, [selectedRowKeys, allrequest]);

  const handleUpdateRecords = () => {
    const { requestComment, requestAmount } = formdata.controls;
    const data = {
      comment: requestComment,
      amount: requestAmount,
    };
    const id = selectedRowKeys[0];

    dispatch(UpdateRequest({ data, setSelectedRowKeys, setShowModal, id }));
  };

  return (
    <Section>
      <Modal
        open={showModal}
        handleCancel={() => {
          setSelectedRowKeys(null);
          setShowModal(false);
        }}
        title="Request"
        handleSumbit={handleUpdateRecords}
        loading={isUpdating === 'loading'}
      >
        <div>
          {results && results.length > 0 && results[0]?.imageList && results[0]?.imageList.length > 0 ? (
            <>
              {results[0]?.imageList.map((item) => (
                <img src={item} alt="" />
              ))}
            </>
          ) : (
            'No Image uploaded'
          )}
        </div>
        <div>
          <div>
            <label>Comment</label>
            <Input.TextArea
              type="text"
              name="requestComment"
              rows={4}
              value={formdata.controls.requestComment}
              onChange={(data, value) => handleInputChange(data, value, 'requestComment')}
              style={{ width: '100%', height: '40px' }}
            />
          </div>
        </div>
        <div>
          <label>Amount</label>
          <Input
            type="number"
            name="requestAmount"
            value={formdata.controls.requestAmount}
            onChange={(data, value) => handleInputChange(data, value, 'requestAmount')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>{' '}
      </Modal>
      <Header title={'Request'} />
      <main>
        <Table
          loading={isGetting === 'loading'}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={TableData}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </main>
    </Section>
  );
};

export default Request;
