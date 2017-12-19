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

export const setCookie = (key,value,expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${key}=${escape(value)}${((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())}`
}

//取回cookie
export const getCookie = key => {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(`${key}=`)
    if (c_start! = -1) { 
      c_start = c_start + key.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    } 
  }
  return "";
}
export function Base64 () { // base64 加密 解密
  // private property
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      // 11>>2 => 0000 0000 0000 0000 0000 0000 0000 1011 
      //       => 0000 0000 0000 0000 0000 0000 0000 0010
      //       => 2
      // 11<<2 => 0000 0000 0000 0000 0000 0000 0000 1011 
      //       => 0000 0000 0000 0000 0000 0000 0010 1100
      //       => 32 + 8 + 4 = 44
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }
 
  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }
 
  // private method for UTF-8 encoding
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
 
    }
    return utftext;
  }
 
  // private method for UTF-8 decoding
  var _utf8_decode = function (utftext) {
    var string = "";
    var i = 0,
        c2 = 0,
        c1 = c2,
        c = c1,
        c3;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

