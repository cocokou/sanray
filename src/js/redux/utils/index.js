import React from 'react';

function core_isFunction(arg) {
  return typeof arg === 'function';
}

function core_isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function core_isString(arg) {
  return typeof arg === 'string';
}

function core_isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

function core_isUndefined(arg) {
  return arg === void 0;
}

function core_isNull(arg){
  return typeof arg === 'object' && arg == null;
}

function clone(target) {
  if (target && typeof target === 'symbol') {
    throw TypeError('Cannot clone "Symbol" object: ' + String(target));
  }
  if (target && typeof target === 'object') {
    if (target && target instanceof Set) {
      return new Set(clone([...target]));
    }
    if (target && target instanceof Map) {
      return new Map(clone([...target]));
    }
    if (target && target instanceof Date) {
      return new Date(target.getTime());
    }
    var newObj = target instanceof Array ? [] : {};
    for (var key in target) {
      var val = target[key];
      newObj[key] = clone(val);
    }
    return newObj;
  } else {
    return target;
  }
}

function form_isNumber(input) { /**** 方法form_isNaN, form_isPositiveNumber 均依赖于本方法，改动需谨慎 **/
  return /^[+-]?((\d+.\d+)|(\d+))$/.test(input + '');
}

function form_isNumberAndLetter(input) {
  if (input === '') {
      return false;
  }
  return (input + '').replace(/[0-9a-zA-Z]*/, '').length === 0;
}

/**
 * isNaN: 原生isNaN的改进版, 判断输入是否为数字
 */
function form_isNaN(input) {
  return !form_isNumber(input);
}

function form_isPositiveNumber(input) {
  return form_isNumber(input) && parseFloat(input) > 0;
}
//正数 且 最大两位小数点，上限 30000
function form_isPositiveRightNumber(input) {
  return /^[+]?((\d+.(\d){1,2})|(\d)+)$/.test(input + '') && parseFloat(input) <= 30000 && parseFloat(input) > 0;
}
function form_isDate(input){
  return /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/.test(input);
}
function form_isTime(input){
  return /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(input);
}
//简单版
function form_isMobile(input){
  return /(^1[\d\*]{10}$)|(^0[\d\*]{9,12}$)/.test(input);
}
//判断电话号码： 固话和移动电话
function form_isTel(input){
  return /^(0\d{2,3}\d{5,9}|0\d{2,3}\d{5,9})|(^((13[0-9])|(14[5,7,9])|(15[^4,\D])|(17[0,1,3,5-8])|(18[0-9]))\d{8})$/.test(input);
}

function form_isCoupon( input ){
  return /(^\d{10}$)|(^\d{12}$)/g.test( input );
}

function form_isNotNumberInput( keyCode ){
  //            删除             左方向键       右方向键
  if((keyCode != 8 && keyCode != 37 && keyCode !=39 && keyCode < 48) || (keyCode > 57 && keyCode < 96) || keyCode > 105){
    return true
  }
}
/**
*
* 描述：日期格式化
*   date   date   日期
*   format string 格式
*   return string
*
* 例子：
*   dateFormat(new Date(2015,9,27), "yyyy-MM-dd") 返回 "2015-10-27"
*
**/
function dateFormat(date, format = 'yyyy-MM-dd') {
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

// 日期偏移
function getDate(base, offset) {
  var now = arguments.length == 2 ? new Date(base) : new Date(),
    o = parseInt(arguments.length == 2 ? offset : arguments[0]) * 24 * 60 * 60 * 1000 || 0,
    month = now.getMonth() + 1,
    newDate = new Date(new Date(now.getFullYear() + '-' + month + '-' + now.getDate() + ' 00:00:00').getTime() + o);
  return dateFormat(newDate, 'yyyy-MM-dd');
};

/**
 * Applies a function to every key-value pair inside an object.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function that receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */
function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key)
    return result
  }, {})
}
function each(target, cb) {
  if (target && typeof target === 'object') {
    if (core_isArray(target)) {
      //target.forEach(target, cb);
      for (var i = 0, len = target.length; i < len; i++)
        cb(target[i], i);
    } else {
      for (var a in target)
        cb(target[a], a);
    }
  }
}
function map(target, cb) {
  var res = [];
  each(target, function(n, i) {
    res.push(cb(n, i));
  });
  return res;
}
function del(target, cb){
  if(core_isArray(target)){
    var index = target.findIndex(cb);
    target.splice(index, 1);
  }
  return target;
}

function some(target, cb){
  if (target && typeof target === 'object') {
    if (core_isArray(target)) {
      //target.forEach(target, cb);
      for (var i = 0, len = target.length; i < len; i++){
        if( cb(target[i], i) ){
          return true
        }
      }
    } else {
      for (var a in target){
        if( cb(target[a], a) ){
          return true
        }
      }
    }
  }
}

function toFixed(target, digit){
  var t = parseFloat(target);
  digit = typeof digit == 'undefined' ? 2 : digit; //默认2位
  if(isNaN(t)){
    return '';
  }else{
    return Number(t.toFixed(digit));
  }
}

//给类似"{修改} {配送站} 为 {龙华站}"这样的文本 着色
function colour(input){
  input = (input + '').trim().split('\n');
  var results = [];
  input.forEach((_input, j) => {
    var tmp = [];
    _input = _input.match(/[^\{\}]*/g);
    var createSpan = index => <span key={index} className="strong">{_input[index]}</span>;
    for(var i=0,len=_input.length; i<len; i++){
      if(_input[i] == ""){
        if( i + 1 <len && _input[i+1] && _input[i+2] == ""){
          tmp.push(createSpan(i+1));
          i += 2;
        }
      }else{
        tmp.push(_input[i]);
      }
    }
    input.length > 1 && tmp.push(<br key={'br' + j} />);
    results.push(<span key={'record-row' + j} className="nowrap">{tmp}</span>); //不允许换行
  })
  return results;
}

//去除表单中的“” 和 "-1" 等无用字段，（主要用于filter 表单中）
function formCompile(form_data){
  for(var a in form_data){
    if(form_data[a] === "" || form_data[a] === "-1")
      form_data[a] = undefined;
  }
  return form_data;
}

function reactReplace(input, reg_or_string, reactElement){
  input = (input || '').split(reg_or_string);
  var results = [], re;
  for(var i=0,len=input.length; i<len; i++){
    results.push(input[i]);
    re = React.cloneElement(reactElement, {key: reactElement.key + i});
    if(i < len - 1){
      results.push(re);
    }
  }
  return results;
}

function parseTime(date_time){
  date_time = date_time || '';
  date_time = date_time.split(' ');
  if(date_time.length >= 2){
    return (
      <div className="time">
        { date_time[0] }
        <br key="br" />
        { date_time[1] }
      </div>
    )
  }
}

function delay(task) {
  setTimeout(task, 0);
}

/**
 * 解析url参数（get请求）
 * @param url: 一般为location.href 或 location.search
 * @returns {obj}
 */
function url_parse(url){
    var paramsObj = {};
    url.replace(/^.*\?/, '').replace(/([^&=]+)=([^&]*)/g, function(a, b, c){
        paramsObj[b] = c;
    });
    return paramsObj;
}

function url_toParams(obj){
    var params = [];
    obj = obj || {};
    for(var a in obj){
        typeof obj[a] != 'undefined' && params.push(a + '=' + obj[a]);
    }
    return params.join('&');
}

/**
 * 锁定当前dom，一般用于数据正在加载时，锁定dom，并显示loading图
 */
function dom_lock( dom ){
  var $dom = $(dom);
  var scrollTop = $dom.scrollTop();
  var scrollLeft = $dom.scrollLeft();
  if( $dom.css('position') == 'static' ){
    $dom.css('position', 'relative');
  }
  var $layer = $dom.data('_lock_layer') || $('<div><i class="fa fa-spin fa-lg fa-spinner"></i></div>');
  $layer.css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    'text-align': 'center',
    top: scrollTop + 'px',
    left: scrollLeft + 'px',
    'z-index': 10,
    background: 'rgba(253, 253, 253, 0.62)'
  }).find('i').css({
    position: 'absolute',
    top: '50%',
    'margin-top': '-10px',
    color: '#fcdfb3'
  });
  
  var onScroll = function(e){
    e.target.scrollTop = scrollTop;
    e.target.scrollLeft = scrollLeft;
  }
  $dom.append($layer)
    .data({'_lock_layer': $layer, '_lock_onScroll': onScroll})
    .on('scroll', onScroll);

  return function(){
    $layer.remove();
    $dom.off('scroll', onScroll);
  }
}

function dom_fixed({ $container = $('#app-container'), dom, offsetTop} ){
  var scrollTop = undefined; //临界点
  var scrollFunc = e => {
    if($container.scrollTop() < scrollTop){
      dom.style.position = 'static';
    }else if($(dom).offset().top <= offsetTop){
      if(!scrollTop){
        scrollTop = $container.scrollTop() + $(dom).offset().top - offsetTop; //获取临界点，只需要一次
      }
      dom.style.position = 'fixed';
      dom.style.top = offsetTop + 'px';
    }
  }
  scrollFunc(); //初始化一次
  $container.on('scroll', scrollFunc);
  return () => $container.off('scroll', scrollFunc)
}

export default {
  core: {
    isArray: core_isArray,
    isObject: core_isObject,
    isString: core_isString,
    isFunc: core_isFunction,
    isUndefined: core_isUndefined,
  },
  form: {
    isNumber: form_isNumber,
    /*严格的表单验证(不会对输入进行trim操作)*/
    isNumberAndLetter: form_isNumberAndLetter,
    isNaN: form_isNaN,
    isPositiveNumber: form_isPositiveNumber, //正数
    isPositiveRightNumber: form_isPositiveRightNumber, //正数, 且最大两位小数，上限30000
    isDate: form_isDate, //yyyy-MM-dd
    isTime: form_isTime, //HH:mm:ss 或 HH:mm
    isMobile: form_isMobile, //简单版
    isTel:    form_isTel,    //电话号码，移动电话和固话
    isCoupon: form_isCoupon, //验券  
    isNotNumberInput: form_isNotNumberInput, //只能输入数字或者删除键或者左右键
  },
  url: {
    parse: url_parse,       //将一个url的参数取出来（与以下过程正好相反）
    toParams: url_toParams, //将一个对象转化为url参数
  },
  dom: {
    lock: dom_lock,       //锁定dom，显示数据正在加载（解锁为其返回值）
    fixed: dom_fixed      //使一个dom悬浮(固定位置，不受滚动条影响)
  },
  dateFormat,
  getDate,

  //对象、数组
  mapValues,
  each,
  map,
  some,
  del,

  clone,

  toFixed,
  delay,

  colour,        //着色
  formCompile,   ////去除表单中的“” 和 "-1" 等无用字段，（主要用于filter 表单中）
  reactReplace,  //将特定字符串转换成 React元素组
  parseTime,     //将时间：2016-01-05 13:00～14:00 ===> 2016-01-05（换行）13:00～14:00
};
