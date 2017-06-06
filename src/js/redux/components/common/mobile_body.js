import React from 'react';
import MobileHeader from '../common/mobile_header';
/*import MobileFooter from '../common/mobile_footer';*/

export const MobileEntry = props => {
  return (<Main>{props.children}</Main>)
}

class Main extends React.Component{
  render(){
    const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          autoplay: true
        };
    return(
      <div>
        <MobileHeader />
        <div>
          {this.props.children}  
        </div>
        {/*<MobileFooter />*/}
      </div>
      )
  }
}