import { core } from 'utils/index';
import Promise from 'utils/promise';

var root = '/';
var config = {
  parabola: {
    js: root + 'lib/parabola.js',
  }
};
var load_map = {};

var createScript = function(jsSrc){
  return new Promise(function(resolve, reject){
    var sc = document.createElement("script");
    sc.type = "text\/javascript";
    sc.src = jsSrc;
    sc.onload = function(){
      resolve();
    };
    document.body.appendChild(sc);
  })
};

export default function LazyLoad(name, callback){
  $(function(){
    var plugin = config[name];
    if(plugin){
      if(!load_map[name]){
        if( load_map[name] != 0 ){
          if(plugin.css){
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = plugin.css;
            document.head.appendChild(link);
          }
          if(core.isString(plugin.js)){
            createScript(plugin.js).done(() => {
              load_map[name] = 1; //加载成功
              callback && callback();
            })
          }else if(core.isArray(plugin.js)){
            setTimeout(function(){
              plugin.js
                .reduce( (prev, next) => prev.pipe( () => createScript(next) ), $.Deferred().resolve())
                .done(() => {
                  load_map[name] = 1; //加载成功
                  callback && callback();
                });
            }, 0);
          }
        }
        load_map[name] = 0; //还在加载中
      }else if(callback){
        callback();
      }
    }else{
      console.error('lazy load "' + name + '" fail');
    }
  })
}

//这是谁干的？
window.LazyLoad = LazyLoad;