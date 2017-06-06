import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import history from 'history_instance';
/*import PCIndex from './components/pc_index';
import ProductManage from './components/product/product_manage';*/
import MobileIndex from './components/mobile_index';
import MobileProduct from './components/product/mobile_product';

import {Entry, NoPermission} from './components/common/pc_body';
import {MobileEntry} from './components/common/mobile_body';
import MediaQuery from 'react-responsive';

import config from 'config/app.config';
import authList from 'config/auth.config';
let components = {};

/**
 * 有无该权限
 * @param  {String} auth 权限名
 */
export default function validate ( auth ){
  var role = sessionStorage.getItem("role");
  var login = sessionStorage.getItem("Y");
  var m = config;
  //特殊情况
  if( !config.test_auth || role == 'admin' ){
    return true;
  }
  var permissions = authList.auth[role];
  return permissions.some( n => n === auth );
}
/**
 * 注意，路由的权限控制存在于两部分，一部分在react-router当中，一部分在nav当中;
 * 该方法用于react-router当中，进行权限控制
 * @param  {String} auth 权限名
 */
export function onEnter( auth ){
  return function (state, replace) {
    //登录成功之后，才有必要进行validate
    if( sessionStorage.getItem("login") == 'Y' ){
      if( !validate( auth ) ){
        replace({}, '/403', null);
        return false;
      }
    }
    return true;
  }
}

const getComponents = (routePath, accessControl) => (nexState, replace, callback) => {
  if(accessControl && !accessControl(nexState, replace)){
    return;
  }

  switch(routePath){
    case 'pm':
      require.ensure([], require => {
        /*components = {...components,
          'ProductPannel' : require('./components/product/product_manage.js'),
        }*/
        components.ProductPannel = require('./components/product/product_manage.js').default;
        components.ProductDetailPannel = require('./components/product/mobile_product').default;
        components.ProductFormPannel = require('./components/product/product_form').default;
        components.ProductMapPannel = require('./components/product/product_map_manage').default;
        callback();
      });
      break;
    case 'am':
      require.ensure([], require => {
        components.UserManagePannel = require('./components/authority/user_manage.js').default;
        components.RoleManagePannel = require('./components/authority/role_manage.js').default;
        components.SysAuthManagePannel = require('./components/authority/system_auth.js').default;
        components.UserFormPannel = require('./components/authority/user_form.js').default;
        components.DeptRolePannel = require('./components/authority/dept_role_manage.js').default;
        callback();
      })
      break;
    case 'mm':
      require.ensure([], require => {
        components.ManufactureManagePannel = require('./components/manufacture/manu_manage.js').default;
        callback();
      })
      break;
    case 'test':
      require.ensure([], require => {
        components.BeltlineManangePannel = require('./components/test/beltline_form.js').default;
        components.BeltlineFormPannel = require('./components/test/beltline_form.js').default;
        callback();
      })
      break;
    default:
      break;
  }
}

const get = componentName => (location, callback) => {
  callback(undefined, components[componentName]);
}

/*export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的Index,变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={Entry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="index" getComponent={get('ProductPannel')}>
                </Route>
              </Route>

            </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/product/:id" component={MobileProduct}></Route> 
          </Router>
        </MediaQuery>
      </div>
    )
  }
}*/

const Root = () =>(
      //这里替换了之前的Index,变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={history}>
            <Route path="/" component={Entry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product"  >
                  <IndexRoute getComponent={get('ProductPannel')}/>
                  <Route path="add" getComponent={get('ProductFormPannel')} />
                </Route>
                <Route onEnter={onEnter("ProductMapAccess")} path="productmap" getComponents={get('ProductMapPannel')} />
              </Route>
              <Route path="am" onEnter={getComponents('am')}>
                <Route path="user">
                  <IndexRoute getComponent={get('UserManagePannel')} />
                  <Route path="add" getComponent={get('UserFormPannel')} />
                </Route>
                <Route path="role" getComponents={get('RoleManagePannel')} />
                <Route path='sysauth' getComponents={get('SysAuthManagePannel')} />
                <Route path='deptrole' getComponents={get('DeptRolePannel')} />
              </Route>
              <Route path="mm" onEnter={getComponents('mm')}>
                <Route path="process" getComponents={get('ManufactureManagePannel')} />
              </Route>

              <Route path="test" onEnter={getComponents('test')}>
                  <Route path="qrcode" getComponents={get('QrcodeManagePannel')} />
                  <Route path="beltline">
                    <IndexRoute getComponents={get('BeltlineManangePannel')} />
                    <Route path="add" getComponents={get('BeltlineFormPannel')} />
                  </Route>
              </Route>
              <Route path="403" component={NoPermission} />

            </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={history}>
            {/*<Route path="/" component={MobileEntry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product/:id" getComponent={get('ProductDetailPannel')} />
              </Route>
            </Route>*/}
            <Route path="/" component={MobileIndex} />
            {/*<Route path="/pm/product/:id" component={MobileProduct}></Route>*/}
            <Route path="/product/:id" component={MobileProduct}></Route>
              {/*<Route path="/pm/product/:id" getComponent={get('ProductDetailPannel')} />*/}
          </Router>
        </MediaQuery>
      </div>
)

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));