import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Nav/Header';
import { SectionStyles } from '../../style/styles.';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllWallets } from '../../store/services/wallet';
import { Table } from 'antd';
import { UserInfo } from '../../hooks/userInfo';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  ${SectionStyles}
`;

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
    title: 'CurrentBalance',
    dataIndex: 'currentBalance',
  },
];

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allwithdraws, isFetching } = useSelector((state) => state.wallet);
  const { allusers } = useSelector((state) => state.user);

  const [selectedRowKeys] = useState(null);

  useEffect(() => {
    const data = '';
    dispatch(GetAllWallets({ data }));
  }, [dispatch]);

  const TableData = useMemo(() => {
    return allwithdraws && allwithdraws.length > 0
      ? allwithdraws.map((item) => {
          return {
            key: item.userId,
            id: item.id,
            userId: UserInfo(allusers, item.userId).useedName,
            currentBalance: parseFloat(item.currentBalance).toLocaleString(),
          };
        })
      : [];
  }, [allwithdraws, allusers]);

  const onSelectChange = (newSelectedRowKeys) => {

    navigate(`/dashboard/wallet/transactions/${newSelectedRowKeys[0]}`);
    // setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
  };

  // useEffect(() => {
  //   if (selectedRowKeys?.length > 0) {
  //     const data = selectedRowKeys[0];
  //     dispatch(GetUserwallet({ data, setSelectedRowKeys }));
  //   }
  // }, [selectedRowKeys, dispatch]);

  return (
    <Section>
      <Header title={'Wallet'} />
      <main>
        <Table
          loading={isFetching === 'loading'}
          columns={columns}
          dataSource={TableData}
          rowSelection={rowSelection}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </main>
    </Section>
  );
};

export default Wallet;
