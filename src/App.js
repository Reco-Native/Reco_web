import { Routes, Route } from 'react-router-dom';
import RequireAuth from './component/Protected';
import {
  Layout,
  Login,
  Dashboard,
  GiftCard,
  Transactions,
  User,
  Wallet,
  Currency,
  Category,
  Requests,
  WalletTransactions,
  UserTransactions,
} from './export';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllUsers } from './store/services/users';
import { GetToken } from './hooks/getToken.js/getToken';
import axios from 'axios';

const App = () => {
  const token = GetToken();
  const dispatch = useDispatch();

  const BaseURL = 'https://my-service-474ad9a5e434.herokuapp.com/api';

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  axios.defaults.headers.common['Authorization'] = ` ${token}`;
  // axios.defaults.headers = {
  //   'Content-Type': 'application/json',
  //   'authorization': `${token}`,
  // };

  useEffect(() => {
    if (!token) return;
    const data = '';
    dispatch(GetAllUsers({ data }));
  }, [dispatch, token]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={'admin'} />}>
          <Route>
            <Route index element={<Dashboard />} />
            <Route path="currency" element={<Currency />} />
            <Route path="category" element={<Category />} />
            <Route path="giftcards" element={<GiftCard />} />
            <Route path="users" element={<User />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="requests" element={<Requests />} />
            <Route path="wallet">
              <Route path="balance" element={<Wallet />} index />
              <Route path="transactions" element={<WalletTransactions />} />
              <Route element={<UserTransactions />} path="transactions/:id" />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
