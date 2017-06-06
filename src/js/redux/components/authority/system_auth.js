import React from 'react';
import { Input , Select, Button, Table, Icon, Breadcrumb, TreeSelect, Menu, Badge, Dropdown, Layout} from 'antd';
import * as config from  'config/app.config.js';
import Nav from '../common/pc_nav';

const Search = Input.Search
const { Content, Sider } = Layout;

const treeData = [{
  label: '产品部门',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '产品专员',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: '产品经理',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
}];

class FilterHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
      role_id: undefined,
    }
  }
  render(){
    return (
      <div className="panel search">
        <div className="panel-body form-inline">
          <Select style={{width: 100}} class="space-right" />
          <Button type="primary" icon="search">搜索</Button>
        </div>
      </div>
      )
  }
  onChange(e){
    this.search({role_id: e})
  }
} 

class TopHeader extends React.Component{
  render(){
    return (
      <div>
            <Breadcrumb style={{ margin: '12px 0', display: 'inline-block' }}>
              <Breadcrumb.Item>权限管理</Breadcrumb.Item>
              <Breadcrumb.Item>系统权限管理</Breadcrumb.Item>
            </Breadcrumb>
      </div>

      )
  }
}

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

function NestedTable() {
  const expandedRowRender = () => {
  const columns = [
      { title: '动作名称', dataIndex: 'action_name', key: 'action_name' },
      { title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
      { title: '动作描述', dataIndex: 'desc', key: 'desc' },
      { title: 'code', dataIndex: 'code', key: 'code' },
      { title: '管理操作', key: 'operation', render: () => (
        <span>
          <a href="#">编辑</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
        </span>
      ) },
    ];

    const data = [
      {
        key: 2,
        action_name: 'Button-添加产品',
        module_name: '产品管理',
        desc: '添加产品按钮',
        code: 'ProductManageAddProduct',
      }
    ]
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
      { title: '动作名称', dataIndex: 'action_name', key: 'action_name' },
      { title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
      { title: '动作描述', dataIndex: 'desc', key: 'desc' },
      { title: 'code', dataIndex: 'code', key: 'code' },
      { title: '管理操作', key: 'operation', render: () => (
        <span>
          <a href="#">编辑</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
        </span>
      ) },
    ];

    const data = [
      {
        key: 1,
        action_name: 'Page-产品管理',
        module_name: '产品管理',
        desc: '【产品管理】页面访问权限】',
        code: 'ProductManageAccess',
      }
    ]

    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
      />
    );
  }

export default class RoleManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
    }
  }
  render(){
    var { list } = this.state;
    const data = [{
      key: 1,
      action_name: 'page-产品管理',
      module_name: '产品管理',
      desc: '【产品管理】页面访问权限',
      children: [{
        key: 2,
        action_name: 'button-添加产品',
        module_name: '产品管理',
        desc: '产品管理页面添加产品按钮',
      },{
        key: 3,
        action_name: 'filter-搜索按钮',
        module_name: '产品管理',
        desc: '产品管理页面搜索按钮',
      }]
    },{
      key: 4,
      action_name: 'page-用户管理',
      module_name: '用户管理',
      desc: '【用户管理】页面访问权限',
      children: [{
        key: 5,
        action_name: 'button-添加用户',
        module_name: '用户管理',
        desc: '用户管理页面添加用户页面',
      }]
    } ];
    return(
      <div> 
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
            <FilterHeader />
            <NestedTable />
          </Content>
        </Layout>     
      </div>
      )
  }
  componentDidMount(){

  }
}