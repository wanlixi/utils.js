# utils.js
前端开发常用的js方法封装

```
// 输入身份证号码获取生日
export const getBirthday = idcard => idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
// 输入身份证号码获取性别
export const getGender = idcard => {
  let gender = parseInt(idcard.substr(16, 1)) % 2 == 1 ? '男' ：'女';
  return gender;
}

// 时间戳转为 xxxx-xx-xx 格式
export const formatDate = timeStamp => {
  let date = new Date(timeStamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${dealthTenBelow(month)}-${dealthTenBelow(day)}`
}
// 小于10的月或日处理 例如9月 =》09月 
export const dealthTenBelow = date => date < 10 ? `0${date}` : date;
// 常用的正则
export const reg = {
  CNName:  /^([\u4E00-\u9FCB\u3400-\u4DB5]{1,26})(·[\u4E00-\u9FCB\u3400-\u4DB5]{1,26})*$/,
  ENName:  /^[a-zA-Z\.\、]([a-zA-Z\.\、\ ]{0,24})[a-zA-Z\.\、]$/,
  IDCARD: /^[0-6](\d{5})(\d{8})(\d{2})(\d)([0-9Xx])$/,
  BORNCARD: /^[A-Z](\d{9})$/,
  PASSPORT: /^[a-zA-Z0-9]{7,26}$/,
  POST:  /^(\d{6})$/,
  EMAIL: /^(\w|([\u4e00-\u9fa5]))+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  PHONE: /^1\d{10}$/i,
  ALLLETTER: /^[a-zA-Z]{5,30}$/,
  ALLNUMBER: /^[0-9]{5,30}$/,
}
```
