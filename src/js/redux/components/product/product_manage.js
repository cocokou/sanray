import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb} from 'antd';
import Nav from '../common/pc_nav';
import * as config from  'config/app.config.js';

const { Content, Sider } = Layout;
const Search = Input.Search


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

class TopHeader extends React.Component{
  render(){
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="top-header-btns">
          <div className="bread-guide">
            <Link to="/pm/product/add"><Button type="primary">添加产品</Button></Link>
          </div>
        </div>
      </div>
      )
  }
}

const columns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
  render: id => <a href="#">{id}</a>,
}, {
  title: '产品名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '区域',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '分类',
  dataIndex: 'type',
  key: 'type'
}, {
  title: '供应商',
  dataIndex: 'supplier',
  key: 'supplier'
},{
  title: '属性',
  dataIndex: 'standard',
  key: 'standard'
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">编辑</a>
      <span className="ant-divider" />
      <a href="#">查看</a>
      <span className="ant-divider" />
      {/*<a href="#" className="ant-dropdown-link">
        上架 <Icon type="down" />
      </a>*/}
    </span>
  ),
}];

export default class ProductManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
    }
  }
  render(){
    var { list } = this.state;
    const data = [{
      id: 1,
      key: 1,
      name: '湘华香鸭脖 肉干肉脯烧烤辣脖42g招商',
      type: '休闲食品 > 肉干肉脯',
      standard: '42g',
      area: '全国',
      supplier: '宁乡县华香食品厂',
      image: 'http://119.23.132.97:8001/images/thumb/0001.png',
    }, {
      id: 2,
      key: 2,
      name: '湘华香鸭脖 肉干肉脯烧烤辣脖42g招商',
      type: '休闲食品 > 肉干肉脯',
      standard: '42g',
      area: '全国',
      supplier: '宁乡县华香食品厂',
      image: 'http://119.23.132.97:8001/images/thumb/0001.png',
    },{
      id: 3,
      key: 3,
      name: '湘华香鸭脖 肉干肉脯烧烤辣脖42g招商',
      type: '休闲食品 > 肉干肉脯',
      standard: '42g',
      area: '全国',
      supplier: '宁乡县华香食品厂',
      image: 'http://119.23.132.97:8001/images/thumb/0001.png',
    }];
    return(
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
            <FilterHeader />
            <Table columns={columns} dataSource={list} />
          </Content>
        </Layout>
      </div>
      )
  }
/*  componentDidMount(){
        var options = config.default.fetchOptions('POST', 'GetProductList', {})
        fetch(config.default.product_info, options)
        .then(res => res.json())
        .then(json => {
          var data = json.data.map( m => {m.key=m.id; return m})
          this.setState({list: data})
        })
        .catch(ex => {console.warn("parsed err: " + ex)})
  }*/
}