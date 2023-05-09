import CryptoJS from 'crypto-js';
import { secret } from './secret';

export const GetToken = () => {
  const User = localStorage.getItem('user');
  if (!User) return;

  var bytes = CryptoJS.AES.decrypt(User, secret());
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(originalText).accessToken;
};
