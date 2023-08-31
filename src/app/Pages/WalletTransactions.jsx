import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Nav/Header';
import { SectionStyles } from '../../style/styles.';
import { useDispatch, useSelector } from 'react-redux';
import { AddFund, GetWalletTransaction, GetWalletTransactionStatus } from '../../store/services/wallet';
import { Table, Input, Select } from 'antd';
import { UserInfo } from '../../hooks/userInfo';
import Modal from '../../component/Modal/Modal';
import { ThemeContextAPI } from '../../context/useContext';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  ${SectionStyles}
`;

const DATA = [
  {
    id: 1,
    label: 'All',
    value: 'All',
  },
  {
    id: 2,
    label: 'Successful',
    value: 'Successful',
  },
  {
    id: 3,
    label: 'Pending',
    value: 'Pending',
  },
  {
    id: 4,
    label: 'Failed',
    value: 'Failed',
  },
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'UserId',
    dataIndex: 'userId',
  },
  {
    title: 'AccountName',
    dataIndex: 'accountName',
  },
  {
    title: 'AccountNumber',
    dataIndex: 'accountNumber',
  },
  {
    title: 'BankName',
    dataIndex: 'bankName',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
  },
  {
    title: 'TransactionType',
    dataIndex: 'transactionType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];
const WalletTransactions = () => {
  const navigate = useNavigate();
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);

  const dispatch = useDispatch();
  const { walletTransactionHistory, gettingHistory, addingfund } = useSelector((state) => state.wallet);
  const { allusers } = useSelector((state) => state.user);
  const [showModal, setShowModal] = React.useState(false);

  const [selectedRowKeys] = useState(null);
  useEffect(() => {
    const data = '';
    dispatch(GetWalletTransaction({ data }));
  }, [dispatch]);

  const handleInputChange = (data, value, name) => {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: data && data.target ? data.target.value : data,
      },
    }));
  };

  const handleAddUserFund = () => {
    if (!formdata.controls.user) {
      return alert('No User Found');
    }

    if (!formdata.controls.fund) {
      return alert('Enter Amount');
    }
    const data = {
      amount: formdata.controls.fund,
    };
    dispatch(AddFund({ data, Id: formdata.controls.user, setFormdata }));
  };
  const TableData = useMemo(() => {
    return walletTransactionHistory && walletTransactionHistory.length > 0
      ? walletTransactionHistory.map((item) => {
          return {
            key: item.id,
            id: item.id,
            Id: item.userId,
            userId: UserInfo(allusers, item.userId).useedName,
            accountName: item.accountName,
            accountNumber: item.accountNumber,
            bankName: item.bankName,
            amount: parseFloat(item.amount).toLocaleString(),
            balance: parseFloat(item.balance).toLocaleString(),
            status: item.status,
            date: new Date(item.createdAt).toDateString(),
            transactionType: item.transactionType === 'DEBIT' ? 'Withdrawal' : item.transactionType,
          };
        })
      : [];
  }, [walletTransactionHistory, allusers]);

  const onSelectChange = (newSelectedRowKeys, data) => {
    if (data[0]?.Id) {
      navigate(`/dashboard/wallet/transactions/${data[0].Id}`);
    }

    // setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
  };

  const onSelect = (data) => {
    dispatch(GetWalletTransactionStatus({ status: data === 'Pending' ? 'Submitted' : data }));
  };

  return (
    <Section>
      <Modal
        open={showModal}
        handleCancel={() => {
          setShowModal(false);
        }}
        title="Add Fund to User Wallet"
        handleSumbit={handleAddUserFund}
        loading={addingfund === 'loading'}
      >
        <div>
          <label>Users</label>
          <Select
            options={
              allusers && UserInfo(allusers).mainUsers && UserInfo(allusers).mainUsers.length > 0
                ? UserInfo(allusers).mainUsers.map((item) => {
                    return {
                      key: item.id,
                      label: item.fullname,
                      value: item.id,
                    };
                  })
                : []
            }
            value={formdata.controls.user}
            onChange={(data, value) => handleInputChange(data, value, 'user')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <label>Amount</label>
          <Input
            type="number"
            name="remark"
            rows={4}
            value={formdata.controls.fund}
            onChange={(data, value) => handleInputChange(data, value, 'fund')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
      </Modal>
      <Header
        title={'Wallet Transactions'}
        addCurrency={true}
        btnTitle={'Add Fund'}
        handleShowModal={() => setShowModal(true)}
        select
        options={DATA}
        onChange={(data, value) => handleInputChange(data, value, 'status')}
        onSelect={onSelect}
      />
      <main>
        <Table
          loading={gettingHistory === 'loading'}
          columns={columns}
          dataSource={TableData}
          rowSelection={rowSelection}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </main>
    </Section>
  );
};

export default WalletTransactions;
