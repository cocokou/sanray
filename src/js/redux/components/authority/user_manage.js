import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb} from 'antd';
import * as config from  'config/app.config.js';
import Nav from '../common/pc_nav';


const { Content, Sider } = Layout;
const Search = Input.Search


class FilterHeader extends React.Component{
  render(){
    return (
      <div className="panel search">
        <div className="panel-body form-inline">
          <Search placeholder="用户名搜索"  style={{maxWidth: 150, marginRight: 5}}/>
          <Button type="primary" icon="search">搜索</Button>

        </div>
      </div>
      )
  }
} 

class TopHeader extends React.Component{
  render(){
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0', display: 'inline-block' }}>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="top-header-btns">
          <div className="bread-guide">
            <Link to="/am/user/add"><Button type="primary">添加用户</Button></Link>
          </div>
        </div>
      </div>

      )
  }
}

const columns = [{
  title: '角色',
  dataIndex: 'role',
  key: 'role',
}, {
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '真实姓名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '电话号码',
  dataIndex: 'tel',
  key: 'tel'
}, {
  title: '所属城市',
  dataIndex: 'city',
  key: 'city'
},{
  title: '是否启用',
  dataIndex: 'active',
  key: 'active'
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">编辑</a>
      <span className="ant-divider" />
      <a href="#">查看</a>
      <span className="ant-divider" />
      <a href="#">禁用</a>
      {/*<a href="#" className="ant-dropdown-link">
        上架 <Icon type="down" />
      </a>*/}
    </span>
  ),
}];

export default class UserManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
    }
  }
  render(){
    var { list } = this.state;
    const data = [{
      role: '管理员',
      name: '超级大BOSS',
      username: 'admin',
      tel: '110',
      city: '深圳',
      active: '是',
    }, {
      role: '产品员',
      name: '小兵',
      username: 'xiaobing',
      tel: '110',
      city: '深圳',
      active: '是',
    }, {
      role: '部门经理',
      name: '小花',
      username: 'huahua',
      tel: '110',
      city: '深圳',
      active: '是',
    }, ];
    return(
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
            <FilterHeader />
            <Table columns={columns} dataSource={data} />
          </Content>
        </Layout>
      </div>
      )
  }
  /*componentDidMount(){
        var options = config.default.fetchOptions('POST', 'GetProductList', {})
        fetch(config.default.requestUrl, options)
        .then(res => res.json())
        .then(json => {
          var data = json.data.map( m => {m.key=m.id; return m})
          this.setState({list: data})
        })
        .catch(ex => {console.warn("parsed err: " + ex)})

  }*/
}