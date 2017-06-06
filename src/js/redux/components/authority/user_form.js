import React from 'react';
import { Input , Select, Checkbox, Button, Table, Icon, Layout, Breadcrumb, Modal} from 'antd';
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
import {Link} from 'react-router';

export default class UserForm extends React.Component{
  render(){
    const plainOptions = ['操作员', '产品经理', '人资经理']
    return (
      <div style={{marginLeft: '26px',}}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/am/user">用户管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>新增用户</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Content style={{padding:'0 0px', minHeight: 280 }}>
            <div class="form-panel">
              <div class="panel-body">
                <div class="form-group form-inline">
                  <label>{'　用户名：'}</label>
                  <Input type="text" style={{width: 200}} />
                </div>
                <div class="form-group form-inline">
                  <label>{'　　密码：'}</label>
                  <Input type="password" style={{width: 200}} />
                </div>
                <div class="form-group form-inline">
                  <label>真实姓名：</label>
                  <Input type="text" style={{width: 200}} />
                  <label>{'　　电话号码：'}</label>
                  <Input type="text" style={{width: 200}} />
                </div>
                <fieldset class='field'>
                  <legend>角色选择</legend>
                  <div>
                    <div class="form-group form-inline">
                      <label>{'　　　　部门：'}</label>
                      <Select style={{width: 200}} />
                    </div>
                    <div class="form-group form-inline">
                      <label>{'　　可选角色：'}</label>
                    </div>
                    <div class="form-group form-inline" style={{paddingLeft: 80}}>
                      <CheckboxGroup options={plainOptions} defaultValue={['人资经理']} />
                    </div>
                    <div class="form-group form-inline">
                      <label>{'　　已选角色：'}</label>
                    </div>
                    <div class="form-group form-inline" style={{paddingLeft: 80}}>
                      <CheckboxGroup options={['人资经理']} defaultValue={['人资经理']} />
                    </div>
                  </div>
                </fieldset>
              </div>
              <Button style={{float: 'right'}} type='primary'>提交</Button>
              <Button style={{float: 'right'}} class="space-right" >取消</Button>
            </div>
          </Content>
        </Layout>
      </div>
      )
  }
}