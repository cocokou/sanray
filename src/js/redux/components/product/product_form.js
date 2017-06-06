import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Modal} from 'antd';
const { Content } = Layout;
const {Option } = Select;

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
},{
  title: '分配部门',
  dataIndex: 'org_name',
  key: 'org',
},{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: () => (
    <span>
      <a href="#">编辑</a>
      <span className="ant-divider" />
      <a href="#">删除</a>
    </span>
    )
}]
export default class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      procedure_visible: false,
      procedure_list: [],
      new_procedure_name: '',
      new_procedure_org: '',
    }
  }
  render(){
    return (
      <div style={{marginLeft: '26px',}}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/pm/product">产品管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>新增产品</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Content style={{padding:'0 0px', minHeight: 280 }}>
            
            <div class="form-panel">
              <div class="panel-form">
                <header class="panel-heading"><Icon type="bars" /><span> 基本信息</span></header>
                <div class="panel-body">
                  <div class="form-group form-inline">
                    <label>产品名称：</label>
                    <Input type="text" style={{width: 200}} />
                  </div>
                  <div class="form-group form-inline">
                    <label>{'　　产地：'}</label>
                    <Select style={{width: 200}} />
                  </div>
                  <div class="form-group form-inline">
                    <label>{'　　类别：'}</label>
                    <Select style={{width: 200}} />
                  </div>
                  <div class="form-group form-inline">
                    <label>{'　供应商：'}</label>
                    <Input type="text" style={{width: 200}} />
                  </div>
                </div>
              </div>
              <div class="panel-form">
                <header class="panel-heading"><Icon type="bars" /><span> 产品展示图</span></header>
                <div class="clearfix" style={{marginLeft: 10, paddingBottom: 20}}>
                  <div class="panel-body">
                    <div style={{float: 'left'}}>
                      <img src="http://placehold.it/332?text=主图"/>
                      <div style={{marginTop: 4, marginRight: '-4px'}}>
                        <img src="http://placehold.it/80?text=图1" style={{marginRight: '4px'}} />
                        <img src="http://placehold.it/80?text=图2" style={{marginRight: '4px'}} />
                        <img src="http://placehold.it/80?text=图3" style={{marginRight: '4px'}} />
                        <img src="http://placehold.it/80?text=图4" style={{marginRight: '4px'}} />
                      </div>
                    </div>
                    <div style={{float: 'left', marginLeft: 30, width: 500}}>
                      <p> 产品展示图（推荐尺寸400px x 400px）</p>
                      <div style={{display: 'inline-block', marginTop: 20, verticalAlign: 'top'}}>
                        <Button class='add-pic' style={{border: '2px dashed #ececec', fontSize: '32px'}} >
                          <Icon type='plus' />
                        </Button>
                      </div>
                      <div style={{display: 'inline-block', marginTop: 20, verticalAlign: 'top'}}>
                        <Button class='add-pic' style={{border: '2px dashed #ececec', fontSize: '32px', marginLeft: 20}} >
                          <Icon type='plus' />
                        </Button>
                      </div>
                      <div style={{display: 'inline-block', marginTop: 20, verticalAlign: 'top'}}>
                        <Button class='add-pic' style={{border: '2px dashed #ececec', fontSize: '32px'}} >
                          <Icon type='plus' />
                        </Button>
                      </div>
                      <div style={{display: 'inline-block', marginTop: 20, verticalAlign: 'top'}}>
                        <Button class='add-pic' style={{border: '2px dashed #ececec', fontSize: '32px', marginLeft: 20}} >
                          <Icon type='plus' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-form">
                <header class="panel-heading"><Icon type="bars" /><span> 生产环节配置</span></header>
                <div class="form-group">
                  <div style={{height: 50}}>
                    <Button style={{float: 'right'}} icon='plus' onClick={this.showProcedureModal.bind(this)}>新增环节</Button>
                  </div>
                  <Table columns={columns} pagination={false} dataSource={this.state.procedure_list}></Table>
                </div>
              </div>
              <Button style={{float: 'right', marginTop: 10}} type="primary">保存设置</Button>
            </div>
          </Content>
        </Layout>

        <Modal title="添加生产环节" visible={this.state.procedure_visible}
          onCancel={this.handleProcedureModalCancel.bind(this)}
          onOk = {this.handleProcedureModalOK.bind(this)}
        >
          <div class="form-group form-inline">
            <label>{'　　名称：'}</label>
            <Input id="procedure_name" style={{width: 200}}/>
          </div>
          <div class="form-group form-inline">
            <label>分配部门：</label>
            <Select style={{width: 200}} onChange={this.onSelectOrgChange.bind(this)}>
              <Option value="部门一">部门一</Option>
              <Option value="部门二">部门二</Option>
              <Option value="部门三">部门三</Option>
              <Option value="部门四">部门四</Option>
            </Select>
          </div>
        </Modal>
      </div>
      )
  }
  showProcedureModal(){
    this.setState({procedure_visible: true});
  }
  handleProcedureModalCancel(e){
      this.setState({
        procedure_visible: false,
      });
    }
  handleProcedureModalOK(){
    var { procedure_list } = this.state;
    procedure_list.push({
      key: procedure_list.length,
      name: $('#procedure_name').val(),
      org_name: this.state.new_procedure_org,
    })
    this.setState({
          procedure_list,
          procedure_visible: false,
        });
  }
  onSelectOrgChange(value){
    this.setState({new_procedure_org: value});
  }
}