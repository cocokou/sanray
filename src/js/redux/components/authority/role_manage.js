import React from 'react';
import { Input , Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Menu, Badge, Dropdown} from 'antd';
import * as config from  'config/app.config.js';
import Nav from '../common/pc_nav';

const { Content, Sider } = Layout;

const Search = Input.Search

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
          <TreeSelect
                  style={{ width: 300 }}
                  value={this.state.role_id}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="请选择角色"
                  treeDefaultExpandAll
                  onChange={this.onChange.bind(this)}
                  class='space-right'
                />
          <Select style={{width: 100}} class="space-right" />
          <Button type="primary" class="space-right" icon="edit">编辑</Button>
          <Button type="primary" icon="save">提交</Button>
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
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>角色管理</Breadcrumb.Item>
          </Breadcrumb>
      </div>

      )
  }
}

const columns = [{
  title: '动作名称',
  dataIndex: 'action_name',
  key: 'action_name',
}, {
  title: '所属模块名称',
  dataIndex: 'module_name',
  key: 'module_name',
}, {
  title: '动作描述',
  dataIndex: 'desc',
  key: 'desc',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

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
            <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){

  }
}