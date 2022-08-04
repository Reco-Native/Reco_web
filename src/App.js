import { Routes, Route } from "react-router-dom";
import RequireAuth from "./component/Protected";
import { Layout, Login, Dashboard } from "./export";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
