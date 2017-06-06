import React from 'react';
import { Input , Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Menu, Badge, Dropdown, Modal} from 'antd';
import * as config from  'config/app.config.js';
import Nav from '../common/pc_nav';

const { Content, Sider } = Layout;

const Search = Input.Search

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
          <Button type="primary" class="space-right" icon="search">搜索</Button>
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
          <div className="top-header-btns">
            <div className="bread-guide">
              <Button type="primary" className="space-right" onClick={this.showDeptModal.bind(this)}>添加部门</Button>
              <Button type="primary" onClick={this.showRoleModal.bind(this)}>添加角色</Button>
            </div>
          </div>
      </div>

      )
  }
  showDeptModal(){
    this.props.showDeptModal();
  }
  showRoleModal(){
    this.props.showRoleModal();
  }
}

const columns = [{
  title: '职位(角色名称)',
  dataIndex: 'role_name',
  key: 'role_name',
}, {
  title: '职能描述',
  dataIndex: 'role_desc',
  key: 'role_desc',
}, {
  title: '管理操作',
  key: 'action',
  render: () => (
    <span>
      <a href="javascript:;">查看</a>
      <span className="ant-divider" />
      <a href="javascript:;">编辑</a>
      <span className="ant-divider" />
      <a href="javascript:;">删除</a>
    </span>
    )
}];


export default class RoleManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
      dept_modal_visible: false,
      role_modal_visible: false,
    }
  }
  render(){
    var { list } = this.state;
    const data = [{
      key: 1,
      role_name: '产品管理',
      role_desc: '负责添加产品',
    },{
      key: 4,
      role_name: '操作人员',
      role_desc: '负责打包等',
    },{
      key: 5,
      role_name: '部门经理',
      role_desc: '负责部门工作分配选人'
    } ];
    return(
      <div>      
        <TopHeader 
          showDeptModal={this.showDeptModal.bind(this)}
          showRoleModal={this.showRoleModal.bind(this)}
           />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
            <FilterHeader />
            <Table columns={columns} dataSource={data} />
          </Content>
        </Layout>
        <Modal title="添加部门" visible={this.state.dept_modal_visible}
          onOk={this.DeptModalHandleOk.bind(this)}
          onCancel={this.DeptModalHandleCancel.bind(this)}>
          <div className="form-group form-inline">
            <label>{'　　部门名称：'}</label>
            <Input type='text' style={{width: 250}} />
          </div>
          <div className="form-group form-inline">
            <label>{'部门职能描述：'}</label>
            <Input type='text' style={{width: 250}} />
          </div>
        </Modal>
        <Modal title="添加角色" visible={this.state.role_modal_visible}
          onOk={this.RoleModalHandleOk.bind(this)}
          onCancel={this.RoleModalHandleCancel.bind(this)}>
          <div className="form-group form-inline">
            <label>{'　　角色名称：'}</label>
            <Input type='text' style={{width: 250}} />
          </div>
          <div className="form-group form-inline">
            <label>{'角色职能描述：'}</label>
            <Input type='text' style={{width: 250}} />
          </div>
          <div className="form-group form-inline">
            <label>{'　　所属部门：'}</label>
            <Select style={{width: 250}} />
          </div>
          <div className="form-group form-inline">
            <label>{'角色数据权限：'}</label>
            <Select style={{width: 250}} />
          </div>
        </Modal>
      </div>
      )
  }
  componentDidMount(){

  }
  showDeptModal(){
    this.setState({dept_modal_visible: true});
  }
  showRoleModal(){
    this.setState({role_modal_visible: true});
  }
  DeptModalHandleOk(){
    this.setState({dept_modal_visible: false});
  }
  DeptModalHandleCancel(){
    this.setState({dept_modal_visible: false});
  }
  RoleModalHandleOk(){
    this.setState({role_modal_visible: false});
  }
  RoleModalHandleCancel(){
    this.setState({role_modal_visible: false});
  }
}