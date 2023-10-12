import CryptoJS from 'crypto-js';

export const UserInfo = (allUser, id) => {
  var bytes = CryptoJS.AES.decrypt(allUser, process.env.REACT_APP_SECRET);
  var originalText = bytes?.toString(CryptoJS.enc.Utf8);
  let mainUsers = [];
  if (originalText) {
    mainUsers = JSON?.parse(originalText);
  }
  let result = mainUsers?.length > 0 && parseInt(id) ? mainUsers.find((c) => Number(c.id) === Number(id)) : '';
  const useedName = result ? result.fullname : id;
  return { mainUsers, useedName };
};
