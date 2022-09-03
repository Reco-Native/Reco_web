import { Routes, Route } from "react-router-dom";
import RequireAuth from "./component/Protected";
import {
  Layout,
  Login,
  Dashboard,
  GiftCard,
  Transactions,
  User,
  Wallet,
  Currency,
} from "./export";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route>
            <Route index element={<Dashboard />} />
            <Route path="currency" element={<Currency />} />
            <Route path="giftcards" element={<GiftCard />} />
            <Route path="users" element={<User />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
