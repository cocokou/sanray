import React from 'react';
import { Layout, Breadcrumb} from 'antd';
import Nav from '../common/pc_nav';
const { Content, Sider } = Layout;

export default class PCIndex extends React.Component{
  render(){
    return(
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
          </Content>
        </Layout>
      </div>
      )
  }
}