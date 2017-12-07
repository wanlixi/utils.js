# utils.js
前端开发常用的js方法封装

### 例如：

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
```
### getPinYin.js是一个中文转拼音，例如
```
getPinYin（'张三'）// Zhang San
```
