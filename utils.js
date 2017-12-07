// 输入身份证号码截取生日
export const getBirthday = idcard => idcard.substring(6, 10) + '-' + idcard.substring(10, 12) + '-' + idcard.substring(12, 14)

// 时间戳转为 xxxx-xx-xx 格式
export const formatDate = timeStamp => {
  let date = new Date(timeStamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}-${dealthTenBelow(month)}-${dealthTenBelow(day)}`
};
// 小于10的月或日处理例如9月=09月
export const dealthTenBelow = date => date < 10 ? `0${date}` : date;
// 常用的正则
export const reg = {
  CNName: /^([\u4E00-\u9FCB\u3400-\u4DB5]{1,26})(·[\u4E00-\u9FCB\u3400-\u4DB5]{1,26})*$/,
  ENName: /^[a-zA-Z\.\、]([a-zA-Z\.\、\ ]{0,24})[a-zA-Z\.\、]$/,
  IDCARD: /^[0-6](\d{5})(\d{8})(\d{2})(\d)([0-9Xx])$/,
  BORNCARD: /^[A-Z](\d{9})$/,
  // E171802399
  TAIWAN: /^[A-Z][0-9]{9}$/,
  // P103265(1)
  XIANGGANG: /[A-Z][0-9]{6}\([0-9A]\)/,
  // 82000019780815709X
  AOMEN: /^[1|5|7][0-9]{6}\([0-9Aa]\)/,
  // PASSPORT: /^[a-zA-Z0-9]{7,26}$/,
  // 因私普通护照号码格式有:14/15+7位数,G+8位数；因公普通的是:P.+7位数；公务的是：S.+7位数 或者 S+8位数,以D开头的是外交护照.D=diplomatic 
  // G28233515 s28233515 141234567
  PASSPORT: /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/,
  POST: /^(\d{6})$/,
  EMAIL: /^(\w|([\u4e00-\u9fa5]))+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  PHONE: /^1\d{10}$/i,
  ALLLETTER: /^[a-zA-Z]{5,30}$/,
  ALLNUMBER: /^[0-9]{5,30}$/,

};
export const getStorage = key => JSON.parse(localStorage.getItem(key) || '[]');
export const setStorage = (items, key) => localStorage.setItem(key, JSON.stringify(items));

