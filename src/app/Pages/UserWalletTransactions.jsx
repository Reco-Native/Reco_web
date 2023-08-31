import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { SectionStyles } from '../../style/styles.';
import Modal from '../../component/Modal/Modal';
import Header from '../../component/Nav/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddFund, userTransactionByStatus, userWalletTransaction } from '../../store/services/wallet';
import { UserInfo } from '../../hooks/userInfo';
import { Input, Table } from 'antd';
import { ThemeContextAPI } from '../../context/useContext';

const Section = styled.section`
  ${SectionStyles}
`;

const UserWalletTransactions = () => {
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const { id } = useParams();
  const [showModal, setShowModal] = React.useState(false);
  const { allusers } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { walletTransactionHistory, gettingHistory, addingfund } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (id) {
      dispatch(userWalletTransaction({ Id: id }));
    }
  }, [id, dispatch]);

  const TableData = useMemo(() => {
    return walletTransactionHistory && walletTransactionHistory.length > 0
      ? walletTransactionHistory.map((item) => {
          return {
            key: item.id,
            id: item.id,
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
    if (!id) {
      return alert('No User Found');
    }

    if(!formdata.controls.fund) {
        return alert('Enter Amount')
    }
    const data = {
      amount: formdata.controls.fund,
    };
    dispatch(AddFund({ data, Id: id, setFormdata }));
  };

  const onSelect = (data) => {
    dispatch(userTransactionByStatus({ status: data === 'Pending' ? 'Submitted' : data, Id: id }));
  };

  return (
    <Section>
      <Modal
        open={showModal}
        handleCancel={() => {
          setShowModal(false);
        }}
        title={`Add Fund to ${UserInfo(allusers, id).useedName} Wallet`}
        handleSumbit={handleAddUserFund}
        loading={addingfund === 'loading'}
      >
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
        title={`${UserInfo(allusers, id).useedName} Transactions`}
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
          //   rowSelection={rowSelection}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </main>
    </Section>
  );
};

export default UserWalletTransactions;

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
