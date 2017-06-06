import { _initialize, create, } from 'utils/create_visiable_map';
import clone from 'clone';

var MyMap = function(list){
  this.map = null;
  this.centerPoint = null;
  this.list = list;
  this.markers = [];
  this.cluster = undefined;

  this.d = $.Deferred();
  this.searchMarker = null;
}

MyMap.prototype.initialScope = function(){
  // 添加点聚合
  let self = this;
  let map = this.map;
  let cluster, markers = [];
  this.list.map(n => {
/*    AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

      //创建SimpleMarker实例
      let marker = new SimpleMarker({
        //前景文字
        iconLabel: n.count,
        //背景图标样式
        iconStyle: 'red',

        //...其他Marker选项...，不包括content
        map: map,
        position: new AMap.LngLat(n.longitude, n.latitude)
      });
      markers.push(marker);
    });*/
    var marker = new AMap.Marker({
        position: new AMap.LngLat(n.longitude, n.latitude),
        offset: {x: -8,y: -34},
        icon: '/src/images/marker.png',
        /*content: '<div class="AMap_marker_box"><div class="count">'+n.count+'</div><div class="AMap_marker"></div></div>',*/
    });
    markers.push(marker);
  })
  this.markers =markers;
  /*AMap.service('AMap.Geocoder',function(){//回调函数
      //实例化Geocoder
      var geocoder = new AMap.Geocoder({
          city: "深圳"//城市，默认：“全国”
      });
      //TODO: 使用geocoder 对象完成相关功能
  })*/
  map.setZoomAndCenter(12, this.centerPoint);
  if (this.cluster) {
    this.cluster.setMap(null);
  }
  map.plugin(["AMap.MarkerClusterer"], function() {
      cluster = new AMap.MarkerClusterer(map, markers);
  });
  this.cluster = cluster;
}

MyMap.prototype.resetScope = function(){
  this.map.remove(this.markers)
  this.markers = [];
}

MyMap.prototype.getCoords = function(){
  var all_coords = clone(this.list);
  all_coords.forEach( n => {
    n.coords = n.coords && outputPonits( n.coords );
  });
  return all_coords;
}

MyMap.prototype.reset = function(){
  this.list = [];
  this.markers = [];
}

MyMap.prototype._initialize = _initialize;
MyMap.prototype.create = create;

export default new MyMap;