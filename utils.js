import api from '@/api'
import wx from 'weixin-js-sdk';
// 输入身份证号码截取生日
export const getBirthday = idcard => `${idcard.substring(6, 10)}-${idcard.substring(10, 12)}-${idcard.substring(12, 14)}`;

// 时间戳转为 xxxx-xx-xx 格式
export const formatDate = (timeStamp, HHMMSS) => {
  let date = new Date(timeStamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  if (HHMMSS) {
    return `${year}-${dealthTenBelow(month)}-${dealthTenBelow(day)} ${dealthTenBelow(h)}:${dealthTenBelow(m)}:${dealthTenBelow(s)}`
  }
  return `${year}-${dealthTenBelow(month)}-${dealthTenBelow(day)}`
};
// 小于10的月或日处理例如9月=09月
export const dealthTenBelow = date => date < 10 ? `0${date}` : date;
// 常用的正则
export const reg = {
  CNName: /^([\u4E00-\u9FCB\u3400-\u4DB5]{1,26})(·[\u4E00-\u9FCB\u3400-\u4DB5]{1,26})*$/, // 中文名字
  ENName: /^[a-zA-Z\.\、]([a-zA-Z\.\、\ ]{0,24})[a-zA-Z\.\、]$/,
  // /(((0[1-9]|[12][0-9]|3[01])/((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)/(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])/(02))/([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29/02/(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))/   xxxx/xx/xx
  BornDate: 
/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/, // xxxx-xx-xx
  CERTIFICATION: [
    {
      REG: /^[0-6](\d{5})(\d{8})(\d{2})(\d)([0-9Xx])$/,
      ID: 1,
      TEXT: '身份证',
      MAX_LENGTH: 18
    },
    {
      REG: /^[A-Z](\d{9})$/,
      ID: 99,
      TEXT: '出生证',
      MAX_LENGTH: 10
    },
    {// E171802399
      REG: /^[A-Z][0-9]{9}$/,
      ID: 6,
      TEXT: '台湾',
      MAX_LENGTH: 18
    },
    {// P103265(1)
      REG: /[A-Z][0-9]{6}\([0-9A]\)/,
      ID: 6,
      TEXT: '香港',
      MAX_LENGTH: 18
    },
    {// 82000019780815709X
      REG: /^[1|5|7][0-9]{6}\([0-9Aa]\)/,
      ID: 6,
      TEXT: '澳门',
      MAX_LENGTH: 18
    },
    // 因私普通护照号码格式有:14/15+7位数,G+8位数；因公普通的是:P.+7位数；公务的是：S.+7位数 或者 S+8位数,以D开头的是外交护照.D=diplomatic 
    // G28233515 s28233515 141234567
    // /^[a-zA-Z0-9]{7,26}$/;  // 太平宝宝的护照
    {
      REG: /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/,
      ID: 3,
      TEXT: '护照',
      MAX_LENGTH: 9
    }
  ],
  POST: /^(\d{6})$/, // 邮编
  EMAIL: /^(\w|([\u4e00-\u9fa5]))+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  PHONE: /^[1][3,4,5,7,8][0-9]{9}$/, //手机号
  ALLLETTER: /^[a-zA-Z]{5,30}$/, // 纯字母
  ALLNUMBER: /^[0-9]{5,30}$/, // 纯数字

};

// sessionStorage
export const getStorage = key => JSON.parse(sessionStorage.getItem(key) || '[]');
export const setStorage = (items, key) => sessionStorage.setItem(key, JSON.stringify(items));
export const getStorageNotIsEmptyArray = key => Object.prototype.toString.call(getStorage(key)) !== '[object Array]';
// cookie
export const setCookie = (key, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${key}=${escape(value)}${((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())}`;
}
//取回cookie
export const getCookie = key => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(`${key}=`);
    if (c_start != -1) { 
      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(";",c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    } 
  }
  return ""
}
/* Base64 encode / decode */

export function Base64 () {
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
    // var c = c1 = c2 = 0;
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
// 微信分享功能禁用
export const controlShare = (option) => {
  // 'hideOptionMenu'  'showOptionMenu'
  function onBridgeReady() {
    WeixinJSBridge.call(option);
  }
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}
// 微信分享朋友和朋友圈
export const wxShare = (com_id) => {
  // let link = location.href;
  // let link = encodeURIComponent(location.href);

  let link = location.href.split('&')[0];
  let wxShareInfos = [
    {
      com_id: 1,
      title: '',
      desc: '',
      imgUrl: ''
    }
  ];
  let {title, desc, imgUrl} = wxShareInfos.filter(item => item.com_id == com_id)[0];
  api.getWxAuthInfo(link).then(res => {
    if (res) {
      wx.config({
        appId: res.appid, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名
        debug: process.env.NODE_ENV === "development", // 开启调试模式,调用的所有a pi的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        jsApiList: [ // 注册要使用微信的哪些功能
          "onMenuShareTimeline", // 分享到朋友圈
          "onMenuShareAppMessage", // 分享给朋友
        ]
      });
      wx.error(err => {
          console.log('config失败',err);
      });
      wx.ready(() => {
        console.log('wxReady')
        wx.onMenuShareAppMessage({
          title, desc, link, imgUrl,
          trigger: res => {  
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回  
          },  
          success: res => {  
            alert('分享给朋友成功');  
          },  
          cancel: res => {  
            alert('你没有分享给朋友');  
          },  
          fail: res => {  
            alert(JSON.stringify(res));  
          }  
        });
        wx.onMenuShareTimeline({
          title, desc, link, imgUrl,
          success: () => {   
            alert('分享到朋友圈成功');  
          },  
          cancel: () => {   
            alert('你没有分享到朋友圈');  
          }  
        })
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

// 地址栏参数转为json
export const parseQueryString = url => {
 let reg_url = /^[^\?]+\?([\w\W]+)$/,
  reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
  arr_url = reg_url.exec(url),
  ret = {};
 if (arr_url && arr_url[1]) {
  let str_para = arr_url[1], result;
  while ((result = reg_para.exec(str_para)) != null) {
   ret[result[1]] = result[2];
  }
 }
 return ret;
}
// 解析url的参数 返回一个对象
export const parseUrl = url => {
  if (Object.prototype.toString.call(url) !== "[object String]") return
  let a = url.split('?')[1];
  let obj = {};
  url = url.trim().replace(/^(\?|#|&)/, '');
  if (!url) return obj
  if (a.indexOf('&') > -1) {
    let x = a.split('&');
    for (let i = x.length - 1; i >= 0; i--) {
      let y = x[i].split('=');
      let key = y[0];
      let val = y[1];
      obj[key] = val;
    }
    return obj
  } else {
    let m = a.split('=');
    return {
      [m[0]]: m[1]
    }
  }
}
