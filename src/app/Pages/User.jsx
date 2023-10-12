import React, { useMemo } from 'react';
import styled from 'styled-components';
import Header from '../../component/Nav/Header';
import { SectionStyles } from '../../style/styles.';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
// import { GetAllUsers } from '../../store/services/users';
// import { secret } from '../../hooks/getToken.js/secret';
// import CryptoJS from 'crypto-js';
// import { setEncoded } from '../../store/slice/user';
import { UserInfo } from '../../hooks/userInfo';

const Section = styled.section`
  ${SectionStyles}
`;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Fullname',
    dataIndex: 'fullname',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];

const User = () => {
  const { allusers, isFetching } = useSelector((state) => state.user);

  const EncodeUser = useMemo(() => {
    const { mainUsers } = UserInfo(allusers, '');

    if (!mainUsers.length > 0) return [];
    return mainUsers && mainUsers?.length > 0
      ? mainUsers.map((item) => {
          return {
            key: item.id,
            id: item.id,
            fullname: item.fullname,
            username: item.username,
            email: item.email,
            phone: item.phone,
            role: item?.roles[0]?.roleName,
          };
        })
      : [];
  }, [allusers]);

  return (
    <Section>
      <Header title={'Users'} />
      <main>
        <Table
          loading={isFetching === 'loading'}
          columns={columns}
          dataSource={EncodeUser}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </main>
    </Section>
  );
};

export default User;
