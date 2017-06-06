import React from 'react';
import { Row, Col, Menu, Icon, Button, Input, Dropdown} from 'antd';
import { Link} from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { createHistory } from 'history';

const history = createHistory();

import * as Utils from 'utils/index';

export default class PCHeader extends React.Component{

  constructor(){
    super();
    var now = new Date();
    this.state = {
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '超级大BOSS',
      userid: 0,
      day: now.getDay(),
      time: Utils.default.dateFormat(new Date()),
      weekday: ['日', '一', '二', '三', '四', '五', '六'],
    }
  }
  render(){
    /*let {getFieldProps } = this.props.form;*/
    const userShowMenu = (
      <Menu onSelect={this.clickHeaderMenu.bind(this)} >
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">个人</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">重置密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" >退出</Menu.Item>
      </Menu>
    );
    return(
      <header style={{backgroundColor: '#fff'}}>
        <Row>
          <Col span={4}>
            <Link to="/">
              <span class="logo" style={{minWidth:200}}>
                <img src="/src/images/logo.png" alt="logo"/>
                <span>Bear</span>
              </span>
            </Link>
          </Col>
          <Col span={12}>
            {/*<Menu mode="horizontal" selectedKeys={[this.state.current]}>
              <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>产品管理</span></span>}>
                <Menu.Item key="product">产品管理</Menu.Item>
                <Menu.Item key="pro2">产品管理</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>类目二</span></span>}>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>类目三</span></span>}>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>用户管理</span></span>}>
              </SubMenu>
            </Menu>*/}
          </Col>
          <Col span={4}>
            <div className="header-middle">
              {this.state.time + '  星期' + this.state.weekday[this.state.day]}
            </div>
          </Col>
          <Col span={4}>
            <div className="header-middle">
              <Dropdown overlay={userShowMenu}  trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                     {(sessionStorage.getItem("role") == "productmanager" ? '产品经理' : '游客') + sessionStorage.getItem("username")}
                    <Icon type="down" />
                  </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </header>
      )
  }
  onCollapse(){
    this.props.onCollapse();
  }
  clickHeaderMenu({key} ){
    if(key=="logout"){
      sessionStorage.clear();
      location.reload();
      /*history.push({pathname: '/'})*/
    }

  }
}