import React from 'react';
import ReactMixin from 'react-mixin';
import MixLog from './mixins';
var Antd_input = require('antd/lib/input');
import 'antd/dist/antd.css';

export default class BodyIndex extends React.Component{

  componentWillMount(){
    MixLog.log();
  }

  render(){
    var userName = '';
    var boolInput = false;

    var html = "IMOOC&nbsp;LESSON";


    return (
      <div>
        <h2>页面主体内容xxx</h2>
        <Antd_input placeholder="Basic usage" />
        <p></p>
      </div>
      )
  }
}

ReactMixin(BodyIndex.prototype, MixLog)