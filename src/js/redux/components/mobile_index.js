import React from 'react';
import MobileHeader from './common/mobile_header';
import MobileFooter from './common/mobile_footer';

export default class MobileIndex extends React.Component{
  render(){
    return(
      <div>
        <MobileHeader />
        <MobileFooter />
      </div>
      )
  }
}