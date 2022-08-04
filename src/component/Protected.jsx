import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  //   const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const user = {
    userType: "admin",
  };

  return (
    <>
      {user && user?.userType === allowedRoles ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
