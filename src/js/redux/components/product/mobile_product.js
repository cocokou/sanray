import React from 'react';
import MobileHeader from '../common/mobile_header';
import { Carousel, Steps, Icon} from 'antd';
import * as config from  'config/app.config.js';
import 'whatwg-fetch'
const Step = Steps.Step;

export default class MobileProduct extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      product_trace_list : [
/*                {
                   "product_name": "农夫山泉系列I",
                   "company_name": "农夫山泉，Inc。",
                   "product_type": "瓶装水",
                   "production_date": "2017-03-25T11:06:06.757",
                   "last_instance_id": 2235412268597067897,
                   "tracing_event_type": "finished_contains",
                   "org_name": "水源车间"
                  },
                  {
                   "product_name": "贵州黄果树清泉水",
                   "company_name": "农夫山泉，Inc。",
                   "product_type": "矿泉水源",
                   "production_date": "2017-03-25T11:06:06.640",
                   "last_instance_id": null,
                   "tracing_event_type": "generate",
                   "org_name": "水源车间"
                  } */ 
      ],
     info: {},
    }

  }
  render(){
    const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          autoplay: true
        };
    var { product_trace_list, info } = this.state;
    var traceDom = product_trace_list.map( (m, index) => {
      return (
        <Step key={index} status="finish" title={m.product_name}
         description={
                      <div>
                        <div><span>{'公司名：'}</span>{m.company_name}</div>
                        <div><span>{'　类型：'}</span>{m.product_type}</div>
                        <div><span>{'　日期：'}</span>{m.production_date}</div>
                        <div><span>{'　产地：'}</span>{m.org_name}</div>
                      </div>
                     }/>
        )
    })
    return(
      <div>
        <MobileHeader />
          <div class="mobile-panel"  style={{marginTop: 0}} >
            <div class="carousel">
              <Carousel {...settings}>
                <div><img src={info.image}/></div>
                {/*<div><img src="./src/images/sample_pic_2.jpg"/></div>
                <div><img src="./src/images/sample_pic_3.jpg"/></div>
                <div><img src="./src/images/sample_pic_4.jpg"/></div>*/}
              </Carousel>
            </div>
            <div class="title-info clearfix">
              <p class="title">{info.name}</p>
              <p class="price">￥499</p>
            </div>
            <div class="block">
              <span>服务</span>
              <span>&nbsp;&nbsp;&nbsp;<Icon type="qrcode" style={{color: '#2db7f5'}}/>&nbsp;正品保障</span>
              <span>&nbsp;&nbsp;<Icon type="pay-circle-o" style={{color: '#2db7f5'}}/>&nbsp;假一赔三</span>
            </div>
          </div>
          <div class="mobile-panel"  style={{marginTop: 10}}>
            <div class="properties">
              <p class="title">基本信息</p>
              <div class="clearfix">
                <ul>
                  <li><label>类别：</label>{info.type}</li>
                  <li><label>供应地区：</label>{info.area}</li>
                  <li><label>属性：</label>{info.standard}</li>
                  <li><label>供应商：</label>{info.supplier}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mobile-panel"  style={{marginTop: 10}}>
            <div class="properties">
              <p class="title">商品介绍</p>
              <div style={{height: 150}}></div>
            </div>
          </div>
          <div class="mobile-panel" style={{marginTop: 10}}>
            <div class="schedule">
              <span class="title">商品追溯</span><span style={{float: 'right'}}><em style={{color: '#2db7f5'}}>100%</em><span>正规渠道</span></span>
              {
                product_trace_list.length ?
                <Steps direction="vertical" size="small" current={5} style={{marginTop: 15}}>
                  {
                    traceDom
                  }
                </Steps>
                :
                <p style={{marginTop: 40,textAlign: 'center'}}><Icon type="frown-o" /> 当前产品无溯源信息</p>
              }
            </div>
          </div>
        {/*<MobileFooter />*/}
      </div>
      )
  }
/*  componentDidMount(){
    var { id } = this.props.params;
    var options = config.default.fetchOptions('POST', 'trace_product_source', {product_instance_id: id})
    var ajaxOptions = config.default.ajaxData( 'trace_product_source', {product_instance_id: id})
    fetch(config.default.trace_product, options)
    .then(res => res.json())
    .then(json => {
      var {data} = json;
      this.setState({product_trace_list: data})
    })
    .catch(ex => {console.warn("parsed err: " + ex)})

    var detailOptions = config.default.fetchOptions('POST', 'getProduct', {pro_id:"103"})
    fetch(config.default.product_info, detailOptions)
      .then( res => res.json())
      .then( json => {
        this.setState({info: json.data})
      })
      .catch(ex => {console.warn("parsed err: " + ex)})
  }*/
}