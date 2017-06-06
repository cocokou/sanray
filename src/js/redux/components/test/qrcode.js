import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Row, Col} from 'antd';
import Nav from '../common/pc_nav';
const { Content, Sider } = Layout;
import * as config from  'config/app.config.js';

class TopHeader extends React.Component{
  render(){
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>测试</Breadcrumb.Item>
          <Breadcrumb.Item>产品二维码</Breadcrumb.Item>
        </Breadcrumb>
        <div className="top-header-btns">
          <div className="bread-guide">
            <Link to="/test/beltline/add"><Button type="primary">进入产品线</Button></Link>
          </div>
        </div>
      </div>
      )
  }
}
export default class QrcodeManage extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return (
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                {/*<img src={config.root + "images/100017.png"}"images/100017.png" />*/}
                <div>产品100017二维码</div>
                <img src="/src/images/100017.png" />
              </Col>
              <Col className="gutter-row" span={12}>
                <div>产品100018二维码</div>
                <img src="/src/images/100018.png" />
              </Col>

              <Col className="gutter-row" span={12} style={{marginTop: 20}}>
                <div>产品100020二维码</div>
                <img src="/src/images/100020.png" />
              </Col>
              <Col className="gutter-row" span={12} style={{marginTop: 20}}>
                <div>产品100021二维码</div>
                <img src="/src/images/100021.png" />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
      )
  }
}