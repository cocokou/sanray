//重构的请求 处理
import $ from 'jquery';
import req from 'superagent';

function Promise(async_task){
  if(typeof async_task == 'function'){
    var $d = $.Deferred();
    async_task($d.resolve, $d.reject);
    return $d;
  }
}

function _end_callback(resolve, reject) {
  return function(err, res) {
    if (err) {
      console.error(err);
      reject('请求失败！');
      return;
    }
    if (res.ok) {
      var { error_code, error_msg, data } = res.body;
      if(error_code != undefined){
        if (error_code === 200001 || error_code === 200002 || error_code === 200003) {
          resolve(data, error_msg);
        }else if(error_code === 400002){
          sessionStorage.clear();
        }else {
          console.error(error_msg || 'request error');
          reject(error_msg, error_code);
        }
      }else{
        console.error(error_msg || 'request error');
        reject(error_msg, error_code);
      }
    } else {
      reject(res.text || 'error');
    }
  };
}

//基本封装
export function get(url, data) {
  var r;
  var p = new Promise(function(resolve, reject) {
    r = req.get(url)
      .query(data)
      .end(_end_callback(resolve, reject));
  });
  p.abort = r.abort.bind(r);
  return p;
}

/*export function post(url, data) {
  var r;
  var p = new Promise(function(resolve, reject) {
    r = req.post(url)
      .send(data)
      .end(_end_callback(resolve, reject));
  });
  p.abort = r.abort.bind(r);
  return p;
}*/

export function post(url, event_id, param){
  let tokenDevice = "";
  if(param.tokenDevice){
    tokenDevice = param.tokenDevice;
    delete param.tokenDevice;
  }
  var data ={
        header: {
          tokenOperator: sessionStorage.getItem("token") || '',
          /*tokenOperator: '',*/
          tokenDevice: tokenDevice,
        },
        data: {
          event_id,
          param,
        }
    }
  var r;
  var p = new Promise(function(resolve, reject){
    r = req.post(url)
      .send(data)
      .end(_end_callback(resolve, reject))
  })
  p.abort = r.abort.bind(r);
  return p;
}