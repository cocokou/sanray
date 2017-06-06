import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, DatePicker, Modal} from 'antd';
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
          状态：
          <Select style={{width: 100}} class="space-right" />
          开始时间：
          <DatePicker className="space-right" />
          结束时间：
          <DatePicker className="space-right" />
          <Button className="space-left" type="primary" icon="search">搜索</Button>
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
          <Breadcrumb.Item>生产管理</Breadcrumb.Item>
          <Breadcrumb.Item>生产环节管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      )
  }
}



export default class ProductManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
      operate_modal_visible: false,
    }
  }

  render(){
    var { list } = this.state;
    const columns = [{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.showOperateModal.bind(this)}>分配人员</a>
          <span className="ant-divider" /><br />
          <a href="#">处理完成</a>
          <span className="ant-divider" /><br />
          <a href="#">查看</a>
          <span className="ant-divider" />
          {/*<a href="#" className="ant-dropdown-link">
            上架 <Icon type="down" />
          </a>*/}
        </span>
      ),
    },{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '处理名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '产品',
      dataIndex: 'product',
      key: 'product',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },{
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline'
    }, {
      title: '人员/设备',
      dataIndex: 'operator',
      key: 'operator'
    },{
      title: '开始时间',
      dataIndex: 'begin_time',
      key: 'begin_time',
    },{
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
    }];

    const operator_columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '姓名',
      dataIndex: 'operator_name',
      key: 'operator_name',
    },{
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },{
      title: '所持设备',
      dataIndex: 'device',
      key: 'device'
    },{
      title: '所属环节',
      dataIndex: 'process_name',
      key: 'process_name',
    },{
      title: '产品线',
      dataIndex: 'product_line',
      key: 'product_line',
    }]
    const data = [{
      id: 1,
      key: 1,
      name: '打包',
      product: '猪肉',
      status: '等待分配',
      operator: '0/100',
      deadline: '2017-01-01 12:00',
      begin_time: '2017-01-01 12:00',
      end_time: '2017-01-01 12:00',
    }, {
      id: 2,
      key: 2,
      name: '装箱',
      product: '猪肉',
      status: '工作中',
      operator: '100/100',
      deadline: '2017-01-01 12:00',
      begin_time: '2017-01-01 12:00',
      end_time: '2017-01-01 12:00',
    },{
      id: 3,
      key: 3,
      name: '打包',
      product: '猪肉',
      status: '处理完成',
      operator: '0/100',
      deadline: '2017-01-01 12:00',
      begin_time: '2017-01-01 12:00',
      end_time: '2017-01-01 12:00',
    },{
      id: 4,
      key: 4,
      name: '打包',
      product: '猪肉',
      status: '已延期',
      operator: '0/100',
      deadline: '2017-01-01 12:00',
      begin_time: '2017-01-01 12:00',
      end_time: '2017-01-01 12:00',
    },];
    const operator_data = [{
      id: '1234567890',
      operator_name: '小明',
      device: '4567894567',
      tel: '112345678',
      status: '可用',
      process_name: '无',
      product_line: '无',
    }]

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
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
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
        <Modal title="分配工作人员" width="800" visible={this.state.operate_modal_visible}
          onCancel={this.operateModalCancel.bind(this)}
          >
          <div className="panel search">
            <div className="panel-body form-inline">
              <Search placeholder="姓名"  style={{maxWidth: 150, marginRight: 5}}/>
              状态：
              <Select style={{width: 100}} class="space-right" />
              <Button className="space-left" type="primary" icon="search">搜索</Button>
            </div>
          </div>
          <div>
            <Table rowSelection={rowSelection} dataSource={operator_data} columns={operator_columns} ></Table>
          </div>
        </Modal>
      </div>
      )
  }
  componentDidMount(){
        /*var options = config.default.fetchOptions('POST', 'GetProductList', {})
        fetch(config.default.requestUrl, options)
        .then(res => res.json())
        .then(json => {
          var data = json.data.map( m => {m.key=m.id; return m})
          this.setState({list: data})
        })
        .catch(ex => {console.warn("parsed err: " + ex)})*/

  }
  showOperateModal(e){
    e.preventDefault();
    this.setState({operate_modal_visible: true})
  }
  operateModalCancel(){
    this.setState({operate_modal_visible: false})
  }
}