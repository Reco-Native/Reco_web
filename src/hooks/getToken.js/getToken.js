import CryptoJS from 'crypto-js';

export const GetToken = () => {
  const User = localStorage.getItem('user');
  if (!User) return;

  var bytes = CryptoJS.AES.decrypt(User, process.env.REACT_APP_SECRET);
  var originalText = bytes?.toString(CryptoJS.enc.Utf8);

  return JSON.parse(originalText).accessToken;
};
