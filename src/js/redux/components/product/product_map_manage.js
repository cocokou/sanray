import React from 'react';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Row, Col, message} from 'antd';
import MyMap from 'utils/product_group_scope';
import Nav from '../common/pc_nav';
import { getProductList, getInstanceLocationList } from 'actions/index';
const { Content, Sider } = Layout;
const Search = Input.Search


class TopHeader extends React.Component{
  render(){
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>产品地图</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      )
  }
}

class FilterHeader extends React.Component{
  render(){
    return (
      <div className="panel search">
        <div className="panel-body form-inline">
          <Search placeholder="关键字搜索"  style={{maxWidth: 150, marginRight: 5}}/>
          分类：
          <Select style={{width: 100}} class="space-right" />
          区域：
          <Select style={{width: 100}} class="space-right" />
          <Button type="primary" icon="search">Search</Button>
        </div>
      </div>
      )
  }


}

export default class QrcodeManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mapPrepared: false, //地图是否已加载好
      fullScreen: false, //地图是否全屏
      share: false,
      list: []
    }
  }
  render(){
    let { fullScreen, share, list } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '产品名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '生产日期',
      dataIndex: 'created',
      key: 'standard'
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.getProductLat.bind(this, record.id)}>查看分布</a>
          <span className="ant-divider" />
        </span>
      ),
    }];
    return (
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
          {/*<FilterHeader />*/}
          <Row>
            <Col span={10}>
              <div className="panel">
                <div className="panel-body">
                  <Table rowKey="id" columns={columns} dataSource={list} />
                </div>
              </div>
            </Col>
            <Col span={14}>
              <div className="panel" style={{marginLeft: '10px'}}>
                <div className="panel-body">
                  <div ref="map" className={`product-map ${fullScreen ? 'full-screen' : ''}`}>
                    <div className="map-toolbar">
                      <Search placeholder="地点搜索" id="searchInput"  style={{maxWidth: 150, marginRight: 5}}/>
                      <a onClick={this.fullScreen.bind(this)} className={`full-screen-btn ${share ? 'hidden' : ''} space-right`} href="javascript:;"></a>
                    </div>
                    <div id="map_container" className="map-container"></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){
    var self = this;
    MyMap.create(function(map){
      this.setState({ mapPrepared: true });
    }.bind(this));
    getProductList()
    .done((data) => {
       self.setState({list: data.filter( m => m.type == 5 )})
    })
    .fail( msg => {
      message(msg || '网络异常，请稍后再试')
    })
  }
  fullScreen(){
    this.setState({ fullScreen: !this.state.fullScreen });
  }
  //将count点分散
  parseData(data){
    var arr = [];
    if(data.count == 1) arr.push(data);
    else{
      var i = 0;
      for(i=0;i<data.count;i++){
        arr.push(data);
      }
    }
    return arr;
  }
  getProductLat(prodId){
    var self = this;
    var userId = sessionStorage.getItem('userid');
    getInstanceLocationList({prodId: prodId.toString(), userId})
      .done( data => {
        var arrS = [];
        data.forEach( m => {
          var resultData = self.parseData(m);
          arrS = [...resultData, ...arrS];
        })
        self._mapInitTimer = setInterval( () => {
          if(self.state.mapPrepared){
            MyMap.resetScope()
            MyMap.list = arrS;
            MyMap.initialScope();
            clearInterval(self._mapInitTimer);
            self.state.callback && self.state.callback();
          }
        }, 100)
      })
      .fail( msg => {
        message(msg || '网络异常，请稍后再试')
      })
  }
  componentWillReceiveProps(nextProps) {
      this._mapInitTimer = setInterval( () => {
        if(this.state.mapPrepared){
          MyMap.reset();

          MyMap.initialScope();
          clearInterval(this._mapInitTimer);
          this.state.callback && this.state.callback();
        }
      }, 100);
  }
}