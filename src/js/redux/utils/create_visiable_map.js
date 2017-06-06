import { Noty, core } from 'utils/index';

function MyMap(){
  this.map = null;
  this.centerPoint = null;
  this.autocomplete = null;
  this.init_flag = 0;
  this.points = [];
  this.markers = [];

  this.d = $.Deferred();
}

export function _initialize() {
  var self = this;
  var point = new AMap.LngLat(113.949964, 22.587609);
  var map = new AMap.Map('map_container', {
         resizeEnable: true,
         zoom:12,
         center: point
     });
  AMap.plugin(['AMap.ToolBar'], function(){
    map.addControl(new AMap.ToolBar());
  });
  AMap.plugin('AMap.Autocomplete',function(){//回调函数
      //实例化Autocomplete
      var autoOptions = {
          city: "", //城市，默认全国
          input:"searchInput"//使用联想输入的input的id
      };
      var autocomplete= new AMap.Autocomplete(autoOptions);
      //TODO: 使用autocomplete对象调用相关功能
      self.autocomplete = autocomplete
  })
  AMap.service('AMap.PlaceSearch',function(){//回调函数
    var placeSearch = new AMap.PlaceSearch({
      map: map
    })
    AMap.event.addListener(self.autocomplete, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name);  //关键字查询查询
    }
  })

  this.map = map;
  this.centerPoint = point;
/*  var top_right_navigation = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    type: BMAP_NAVIGATION_CONTROL_SMALL
  }); //右上角，仅包含平移和缩放按钮
  this.map.addControl( top_right_navigation );
  this.map.enableScrollWheelZoom();
  this.map.enableDragging();*/
  this.d.resolve(this.map);
}
MyMap.prototype._initialize = _initialize;

export function create(callback) {
  if(!window.AMap){
    var script = document.createElement("script");
    window._amap_callback = this._initialize.bind(this);
    //script.src = "http://webapi.amap.com/maps?v=1.3&key=e7bb3a93646fc45cf3dfb2f2dc5cffa5";//此为v2.0版本的引用方式  
    script.src = "http://webapi.amap.com/maps?v=1.3&key=e7bb3a93646fc45cf3dfb2f2dc5cffa5&callback=_amap_callback";//此为v2.0版本的引用方式  
    // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式  
    document.body.appendChild(script);
    this.d.done(callback);
  }else{
    this._initialize.call(this);
    callback && callback(this.map);
  }
}

MyMap.prototype.create = create;

export default new MyMap;


