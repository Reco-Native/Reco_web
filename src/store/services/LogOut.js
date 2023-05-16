export const LogOut = (navigate) => {
  localStorage.clear('user');
  navigate('/');
};
