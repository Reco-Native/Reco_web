import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Nav/Header';
import { SectionStyles } from '../../style/styles.';
import { useDispatch, useSelector } from 'react-redux';
import { GetTransactions, UpdateTransaction } from '../../store/services/transaction';
import { Button, Input, Select, Table } from 'antd';
import Modal from '../../component/Modal/Modal';
import { ThemeContextAPI } from '../../context/useContext';
import { clearMessage } from '../../store/slice/messageSlice';
import { Notification } from '../../component/Notification/Notification';

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
    title: 'Status',
    dataIndex: 'status',
  },
];

const Status = [
  {
    key: 1,
    label: 'SUBMITTED',
    value: 'SUBMITTED',
  },
  {
    key: 2,
    label: 'PROCESSING',
    value: 'PROCESSING',
  },
  {
    key: 3,
    label: 'APPROVAL',
    value: 'APPROVAL',
  },
  {
    key: 4,
    label: 'DECLINED',
    value: 'DECLINED',
  },
];

const Transaction = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const { transactions, isGetting, isUpdating } = useSelector((state) => state.transaction);
  const { message } = useSelector((state) => state.message);

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
      dispatch(GetTransactions({ data }));
    };

    fetchTran();
  }, []);

  const UpdateRecord = () => {
    const { status, remark } = formdata.controls;
    const id = selectedRowKeys[0];
    const data = {
      status,
      remark,
    };
    dispatch(UpdateTransaction({ id, data, setShowModal, setSelectedRowKeys }));
  };

  const TableData = useMemo(() => {
    return transactions && transactions.length > 0
      ? transactions.map((item) => {
          return {
            key: item.id,
            date: new Date(item.date).toLocaleString(),
            name: item?.giftCard?.name,
            type: item.type,
            amount: item.amount,
            categoryname: item?.giftCard?.category?.categoryName,
            country: item?.giftCard?.category?.country?.name,
            currency: item?.giftCard?.category?.country?.currency,
            rate: item?.giftCard?.rate,
            profit: item?.giftCard?.profit,
            status: item.status,
          };
        })
      : [];
  }, [transactions]);

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
      const filterData = transactions.filter((item) => item.id === selectedRowKeys[0]);
      if (filterData?.length > 0) {
        setFormdata((s) => ({
          ...s,
          controls: {
            ...s.controls,
            status: filterData[0].status,
            remark: filterData[0].remark,
          },
        }));
      }

      setShowModal(true);
    }
  }, [selectedRowKeys]);

  useEffect(() => {
    let mounted = true;
    if (mounted && message !== '') {
      if (message === 'Updated Successfully') {
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
    <Section>
      <Modal
        open={showModal}
        handleCancel={() => {
          setSelectedRowKeys(null);
          setShowModal(false);
        }}
        title="Update Transaction"
        handleSumbit={UpdateRecord}
        loading={isUpdating === 'loading'}
      >
        <div>
          <label>Status</label>
          <Select
            options={Status}
            value={formdata.controls.status}
            onChange={(data, value) => handleInputChange(data, value, 'status')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <label>Remark</label>
          <Input.TextArea
            type="text"
            name="remark"
            rows={4}
            value={formdata.controls.remark}
            onChange={(data, value) => handleInputChange(data, value, 'remark')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
      </Modal>
      <Header title={'Transaction'} />
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

export default Transaction;
