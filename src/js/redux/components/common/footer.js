import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component{
  render(){
    var html = "IMOOC&nbsp;LESSON"; //事先要进行unicode转码
    return (
      <footer>
        <h1>页脚</h1>
        <p>{html}</p>
        <p dangerouslySetInnerHTML = {{__html : html}} ></p>
      </footer>
      )
  }
}