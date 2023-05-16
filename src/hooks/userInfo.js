import CryptoJS from 'crypto-js';
import { secret } from './getToken.js/secret';

export const UserInfo = (allUser, id) => {
  var bytes = CryptoJS.AES.decrypt(allUser, secret());
  var originalText = bytes?.toString(CryptoJS.enc.Utf8);
  let mainUsers = [];
  if (originalText) {
    mainUsers = JSON?.parse(originalText);
  }
  let result = mainUsers?.length > 0 && parseInt(id) ? mainUsers.find((c) => Number(c.id) === Number(id)) : '';
  const useedName = result ? result.fullname : id;
  return { mainUsers, useedName };
};
