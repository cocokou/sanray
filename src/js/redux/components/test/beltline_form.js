import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Modal,
         Transfer, Checkbox, Row, Col, Tag, Badge, message, Steps, Radio,
         InputNumber, Collapse
       } from 'antd';
import config from 'config/app.config';
import { getProductIngredients, handleProductEvent } from 'actions/index';

const Panel = Collapse.Panel;
const { Content } = Layout;
const {Option } = Select;
const { Step } = Steps;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const QRCode = require('qrcode.react');
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
const porkSteps =[{
  title: '选择',
  content: '选择'
},{
  title: '切割',
  content: '切割'
},{
  title: '完成',
  content: '完成'
}];
const pickleSteps = [{
  title: '选择',
  content: '选择',
},{
  title: '切割',
  content: '切割'
},{
  title: '完成',
  content: '完成'
}];
const bottleSteps = [{
  title: '选择',
  content: '选择',
},{
  title: '完成',
  content: '完成'
}];
class DeviceOptions extends React.Component {
  render(){
    var options = config.device_list;
    var { value } = this.props;
    return (
      <div>
        使用设备：
        <RadioGroup value={value}>
          {
            options.map( m =>
            <RadioButton key={m.id} value={m.id} disabled = {m.id != value}><Icon type="qrcode"></Icon>{m.text}</RadioButton>)
          }
        </RadioGroup>
      </div>
    )
  }
}

class ProductConstainer extends React.Component {
  render(){
    var { list, imgSrc, productType } = this.props;
    return (
      <div className="product-container">
        <img  style={{display: 'inline-block'}} src={imgSrc} />
        <div style={{display: 'inline-block'}}>
          <ul>
          {
            list.map( m =>
              <li key={m}>
                <Tag color="purple">{productType + m}号</Tag>
              </li>)
          }
          <p style={{clear: 'both'}}></p>
        </ul>
        </div>
      </div>
      )
  }
}

class QRCodePanel extends React.Component {
  render(){
    var { list } = this.props;
    return (
      <div className="process-guide" style={{height: 'auto'}}>
        {
          list.length ?
          <ul>
            {
              list.map( m =>
                <li key={m} className="process-step">
                  <div class="img" style={{border: '0px', borderRadius: '0px'}}>
                    <QRCode  value={"https://www.wulian2025.net?productid=" + m}/>
                  </div>
                  <div className="text" style={{width: 'auto'}}>
                    {'编号：' + m}
                  </div>
                </li>
                )
            }
            <p style={{clear: 'both'}}></p>
          </ul>
          :
          <div>产品库无库存</div>
        }
      </div>
      )
  }
}

export default class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      targetKeys: [],
      product_count: 0,
      package_count: 0,
      select_productids: [],
      submit_ing: false,
      source_list: [],
      pid: '',

      porkType: 6,
      pickleType: 7,
      bottleType: 8,

      current_step: null, //指明当前生产原材料为步骤几
      current_steps: [], //当前生产原材料的所有步骤
      current_type: null, //当前生产的是哪一种原材料

      selected_type:null,  //生产原材料时，选中哪一个原材料
      current_divides: 1, //当前分隔的数量
      current_img_src: '',  //原材料的图片
      current_divide_img_src: '', //分割后的原材料图片

      meat_count: 0, //肉块数量
      pickle_count: 0, //咸菜数量
      bottle_count: 0, //瓶子数量

      current_track_step: null,

      product_list_modal_visible: false,

      instance_pork_list: [ ],
      instance_pickle_list: [],
      instance_bottle_list: [],

      instance_can_list: [],
      produced_instance_can_list: [],
      instance_pack_list: [],

      select_ingre_pork_list: [],
      select_ingre_bottle_list: [],
      select_ingre_pickle_list: [],
      select_can_list: [],
      step1_result_id: '',
      activeKey: '',

      current_logistic_step: 0,
      shipdest: '',
    }
  }
  render(){
    var { product_count, package_count, submit_ing, source_list, pid, current_type, current_step,
      selected_type, current_steps, porkType, pickleType, bottleType, current_divides,
      meat_count, pickle_count, bottle_count, current_img_src, current_divide_img_src, produced_instance_can_list,
      current_track_step,instance_pork_list,instance_pickle_list,instance_bottle_list,
      instance_can_list, instance_pack_list, current_logistic_step,
      select_ingre_bottle_list, select_ingre_pickle_list, select_ingre_pork_list, select_can_list,
      product_list_modal_visible, ship_modal_visible, step1_result_id, activeKey } = this.state;
    const divides = [1, 2, 3,4, 5, 6, 7, 8, 9, 10];
    var device_list = config;
    return (
      <div style={{marginLeft: '26px',}}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item><Link to="/test/qrcode">测试</Link></Breadcrumb.Item>
          <Breadcrumb.Item>生产线</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Content style={{padding:'0 0px', minHeight: 280 }}>
            <div class="form-panel">
              <div class="panel-form">
                <header class="panel-heading"><Icon type="bars" />
                  <span> 梅菜扣肉罐头溯源流程</span>
                  <div
                    class="fly-img">
                    <img src="/src/images/logo.png" /></div>
                  {/*<div style={{float: 'right'}}>
                    <Badge count={package_count} style={{ backgroundColor: '#87d068'}}>
                        <Tag color="cyan" id="package-tag">包裹</Tag>
                    </Badge>
                  </div>*/}
                  <div style={{float: 'right'}}>
                        <Button onClick={() => { this.setState({product_list_modal_visible: true})}}>产品二维码</Button>
                  </div>
                </header>
                <div class="panel-body">
                  <div className="process-guide">
                    <ul>
                      <li class={activeKey == 'produce' ? 'process-step active': 'process-step'}>
                        <div className="img"  onClick={this.openPanel.bind(this, 'produce')}>
                          <img src="/src/images/produce.png" />
                        </div>
                        <div className='text'>配料生产</div>
                      </li>
                      <li class="arrow"></li>
                      <li  class={activeKey == 'jar-produce' ? 'process-step active': 'process-step'}>
                        <div className="img" onClick={this.openPanel.bind(this, 'jar-produce')}>
                          <img src="/src/images/jar-produce.png" />
                        </div>
                        <div className='text'>罐头制作</div>
                      </li>
                      <li class="arrow"></li>
                      <li  class={activeKey == 'package' ? 'process-step active': 'process-step'}>
                        <div className="img" onClick={this.openPanel.bind(this, 'package')}>
                          <img src="/src/images/package.png" />
                        </div>
                        <div className='text'>打包</div>
                      </li>
                      <li class="arrow"></li>
                      <li  class={activeKey == 'logistic' ? 'process-step active': 'process-step'}>
                        <div className="img" onClick={this.openPanel.bind(this, 'logistic')}>
                          <img src="/src/images/bus.png" />
                        </div>
                        <div className='text'>物流</div>
                      </li>
                      {/*<li class="process-step">
                        <div className="img" onClick={this.openPanel.bind(this, 'storage')}>
                          <img src="/src/images/storage.png" />
                        </div>
                        <div className='text'>仓储入库</div>
                      </li>
                      <li class="arrow"></li>
                      <li class="process-step">
                        <div className="img">
                          <img src="/src/images/bus.png" />
                        </div>
                        <div className='text'>出库运输</div>
                      </li>
                      <li class="arrow"></li>
                      <li class="process-step">
                        <div className="img">
                          <img src="/src/images/mall.png" />
                        </div>
                        <div className='text'>卖场仓储</div>
                      </li>
                      <li class="arrow"></li>*/}
                    </ul>
                  </div>
                  <Collapse activeKey={activeKey} style={{marginTop: '40px'}}>
                    <Panel header="配料生产工作间" key="produce">
                      <div className="recipe">
                        <p />配料：梅菜一份，猪肉一份，罐头瓶一份
                      </div>
                      <div style={{marginTop: '60px'}}>
                        <Row gutter={24}>
                          <Col span={8}>
                            <div>
                                <Badge id="pork-badg" count={meat_count} showZero style={{ backgroundColor: '#87d068'}}>
                                    <a className={ current_type == porkType && (current_step || current_step == 0) ? 'ingre porkbox active':'ingre porkbox'}>
                                      <Button className="produce-btn" onClick={this.getIngre.bind(this, porkType)}>生产</Button>
                                    </a>
                                </Badge>
                            </div>
                          </Col>
                          <Col span={8}>
                          <div>
                              <Badge id="pickle-badg" count={pickle_count} showZero style={{ backgroundColor: '#87d068'}}>
                                  <a className={ current_type == pickleType && (current_step || current_step == 0)  ? 'ingre picklebox active' : 'ingre picklebox'}>
                                    <Button className="produce-btn" onClick={this.getIngre.bind(this, pickleType)}>生产</Button>
                                  </a>
                              </Badge>
                          </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              <Badge id="bottle-badg" count={bottle_count} showZero style={{ backgroundColor: '#87d068'}}>
                                  <a className={ current_type == bottleType && (current_step || current_step == 0)  ? 'ingre bottlebox active' : 'ingre bottlebox'}>
                                    <Button className="produce-btn" onClick={this.getIngre.bind(this, bottleType)}>生产</Button>
                                  </a>
                              </Badge>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <Steps current={current_step}>
                            {current_steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                          {
                            current_step == 0 ?
                            <div className="steps-content">
                              <div>
                                <img style={{display: 'inline-block', verticalAlign: 'middle'}} src={current_img_src}/>
                                <div style={{textAlign: 'left', display: 'inline-block', verticalAlign: 'middle', marginLeft: '20px'}}>
                                  <RadioGroup onChange={this.onChangeUseType.bind(this)} value={selected_type}>
                                    {source_list.filter( m => m.type == current_type).map( item =>
                                      <Radio style={radioStyle} key={item.key} value={item.key}>
                                        {item.title + '-' + item.description}
                                      </Radio>)}
                                  </RadioGroup>
                                </div>
                              </div>
                              <div style={{textAlign: 'left', display: 'inline-block', verticalAlign: 'middle', marginLeft: '20px', marginTop: '20px'}}>
                                <DeviceOptions value={1} />
                              </div>
                            </div>
                            : null
                          }
                          {
                            current_type != bottleType && current_step == 1 ?
                            <div className="steps-content">
                              <div style={{paddingTop: '40px'}}>
                                <label>{ current_type == pickleType ? '腌菜' + step1_result_id:'猪' + step1_result_id}号分割成 </label>
                                <InputNumber value={current_divides} onChange={this.divide.bind(this)} /> 份
                              </div>
                              <div style={{textAlign: 'left', display: 'inline-block', verticalAlign: 'middle', marginLeft: '20px', marginTop: '20px'}}>
                                <DeviceOptions value={1} />
                              </div>
                            </div>
                            : null
                          }
                          {
                            current_type == porkType && current_step == 2 ||
                             current_type == pickleType && current_step == 2 ||
                             current_type == bottleType && current_step == 1 ?
                            <div className="steps-content">
                              <div>
                                {
                                  current_type == porkType ?
                                  <ProductConstainer
                                    list={instance_pork_list}
                                    productType={'猪肉'}
                                    imgSrc=""/>
                                    :null
                                }
                                {
                                  current_type == pickleType ?
                                  <ProductConstainer
                                    list={instance_pickle_list}
                                    productType={'腌菜'}
                                    imgSrc=""/>
                                    :null
                                }
                                {
                                  current_type == bottleType ?
                                  <ProductConstainer
                                    list={instance_bottle_list}
                                    productType={'罐头瓶'}
                                    imgSrc=""/>
                                    :null
                                }
                              </div>
                              <div>
                                <div style={{ display: 'inline-block', verticalAlign: 'middle'}}>
                                  <label>获得 </label>
                                  <InputNumber value={current_divides} disabled /> 份
                                </div>
                                <img id="divide-img" style={{display: 'inline-block', verticalAlign: 'middle', width: '60px', height: '60px'}} src={current_divide_img_src}/>
                              </div>
                            </div>
                            : null
                          }
                        <div className="steps-action" style={{marginTop: '24px'}}>
                          {
                            this.state.current_step < current_steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>下一步</Button>
                          }
                          {
                            /*this.state.current_step === current_steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.done()}>完成</Button>*/
                          }
                        </div>
                      </div>
                    </Panel>
                    <Panel header="罐头生产工作间" key="jar-produce">
                      <div className="recipe">
                        <p />配料清单：现在猪肉{instance_pork_list.length}份，
                            腌菜{instance_pickle_list.length}份，
                            罐头瓶{instance_bottle_list.length}份
                      </div>
                      <div style={{marginTop: '20px'}}>
                        <ProductConstainer
                          productType={"罐头"}
                          list={instance_can_list}
                          imgSrc={'/src/images/can.png'} />
                      </div>
                      <div style={{marginTop: '20px'}}>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">猪肉</Tag>
                          <CheckboxGroup value={select_ingre_pork_list} onChange={this.selectInstance.bind(this, porkType)} 
                            options={instance_pork_list.map( m => ({label: '猪肉' + m + '号', value: m}))} />
                        </div>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">咸菜</Tag>
                          <CheckboxGroup value={select_ingre_pickle_list} onChange={this.selectInstance.bind(this, pickleType)}  
                            options={instance_pickle_list.map( m => ({label: '腌菜' + m + '号', value: m}))}/>
                        </div>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">瓶子</Tag>
                          <CheckboxGroup value={select_ingre_bottle_list} onChange={this.selectInstance.bind(this, bottleType)}  
                            options={instance_bottle_list.map( m => ({label: '瓶子' + m + '号', value: m}))}/>
                        </div>
                      </div>
                      <div style={{marginTop: '20px'}} >
                        <DeviceOptions value={1} />
                      </div>
                      <Button style={{marginTop: '20px'}} type="primary" onClick={this.onProduce.bind(this)}>生产</Button>
                    </Panel>
                    <Panel header="打包工作间" key="package">
                      <div className="recipe">
                        <p />产品清单：现在罐头{instance_can_list.length}份
                      </div>
                      <div style={{marginTop: '20px'}}>
                        <ProductConstainer
                          productType={"包裹"}
                          list={instance_pack_list}
                          imgSrc={'/src/images/pack.png'} />
                      </div>
                      <div style={{marginTop: '20px'}}>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">罐头</Tag>
                          <CheckboxGroup value={select_can_list} onChange={this.selectInstance.bind(this, 'can')} 
                            options={instance_can_list.map( m => ({label: '梅菜扣肉罐头' + m + '号', value: m}))} />
                        </div>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">发往地点</Tag>
                          <Select
                              style={{ width: 200 }}
                              placeholder="请选择"
                              onChange={this.handleDestChange.bind(this)}
                            >
                              <Option value="ShenZhen">深圳</Option>
                              <Option value="GuangZhou">广州</Option>
                              <Option value="Wuhan">武汉</Option>
                            </Select>
                        </div>
                        <div>
                          <DeviceOptions value={1} />
                        </div>
                      </div>
                      <Button style={{marginTop: '20px'}} type="primary" onClick={this.onPackage.bind(this)}>打包</Button>
                    </Panel>
                    <Panel header="物流工作间" key="logistic">
                      <div className="recipe">
                        <p />包裹清单：现有包裹{instance_pack_list.length}个
                      </div>
                      <div style={{marginTop: '20px'}}>
                      <Steps current={current_logistic_step}>
                        <Step key="仓储入库" title="仓储入库" />
                        <Step key="出库运输" title="出库运输" />
                        <Step key="卖场入库 " title="卖场入库" />
                      </Steps>
                      </div>
                      <div className="steps-content" style={{marginTop: '20px'}}>
                        <div style={{padding: '8px'}}>
                          <Tag color="cyan">包裹</Tag>
                          <ProductConstainer
                            productType={"包裹"}
                            list={instance_pack_list}
                            imgSrc={''} />
                        </div>
                        <div>
                          <DeviceOptions value={current_logistic_step + 2} />
                        </div>
                      </div>
                      <div className="steps-action" style={{marginTop: '24px'}}>
                          {
                            this.state.current_logistic_step == 0
                            &&
                            <Button type="primary" onClick={() => this.onLogistic("2", "1001")}>仓储入库</Button>
                          }
                          {
                            this.state.current_logistic_step == 1
                            &&
                            <Button type="primary" onClick={() => this.onLogistic("3", "1002")}>出库运输</Button>
                          }
                          {
                            this.state.current_logistic_step === 2
                            &&
                            <Button type="primary" onClick={() => this.onLogistic("4", "1001")}>卖场入库</Button>
                          }
                        </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <Modal
                title="产品二维码"
                visible={product_list_modal_visible}
                onOK = {() => { this.setState({product_list_modal_visible: false})}}
                onCancel = {() => { this.setState({product_list_modal_visible: false})}}
                footer = {null}
              >
                <QRCodePanel list={produced_instance_can_list}/>
              </Modal>
            </div>
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){
    var self = this;
    getProductIngredients()
    .done((data) => {
       var ingre = [];
       ingre = data.map( m => ({key: m.id, type: m.type, description: m.briefing, title: m.name}))
       self.setState({source_list: ingre})
    })
    .fail( msg => {
      message.error(msg || '网络异常，请稍后再试')
    })
  }

  handleChange(nextTargetKeys, direction, moveKeys){
      this.setState({ targetKeys: nextTargetKeys });
  }
  onChangeUseType(e){
    this.setState({selected_type: e.target.value})
  }
  selectInstance(type, checkedValues){
    let { porkType, pickleType, bottleType } = this.state;
    switch(type){
      case porkType:
        this.setState({select_ingre_pork_list: checkedValues});break;
      case pickleType:
        this.setState({select_ingre_pickle_list: checkedValues});break;
      case bottleType:
        this.setState({select_ingre_bottle_list: checkedValues});break;
      case 'can':
        this.setState({select_can_list: checkedValues});break;
      default:break;
    }
  }
  onProduce(){
    var self = this;
    var { select_ingre_bottle_list,
       select_ingre_pork_list, select_ingre_pickle_list, instance_can_list,
       instance_pork_list, instance_bottle_list, instance_pickle_list,
       produced_instance_can_list } = this.state;
    this.setState({pid: '', submit_ing: true})
    let existing_instances = [...select_ingre_pork_list, ...select_ingre_pickle_list, ...select_ingre_bottle_list]
    .map( m => ({id: m.toString()}));
    handleProductEvent({
      type: '8',
      new_instances: [{
        pid: "109",
        instance_type: "100",
      }],
      existing_instances,
      tokenDevice: "1",
    })
      .done((data) => {
        var new_instance_pork_list = instance_pork_list.filter( m => select_ingre_pork_list.every( n => n != m));
        var new_instance_pickle_list = instance_pickle_list.filter( m => select_ingre_pickle_list.every( n => n != m));
        var new_instance_bottle_list = instance_bottle_list.filter( m => select_ingre_bottle_list.every( n => n != m));
        self.setState({
         instance_can_list: [...instance_can_list, ...data],
         produced_instance_can_list: [...produced_instance_can_list, ...data ],
         submit_ing: false,
         instance_bottle_list: new_instance_bottle_list,
         instance_pickle_list: new_instance_pickle_list,
         instance_pork_list: new_instance_pork_list,
         select_ingre_pork_list: [],
         select_ingre_bottle_list: [],
         select_ingre_pickle_list: [],
       })
      })
      .fail( msg => {
         message.error(msg || '网络异常，请稍后再试')
         self.setState({submit_ing: false})
      })

  }
  onPackage(){
    let { select_can_list, instance_can_list, instance_pack_list, shipdest } = this.state;
    let self = this;
    if(shipdest=="" || !shipdest){
      message.error('请选择发往地点');return;
    }else{
      handleProductEvent({
        type: '3',
        new_instances: [{
          pid: "108",
          instance_type: "88",
        }],
        existing_instances: select_can_list.map(m => ({id: m.toString()})),
        destination: shipdest,
        tokenDevice: "1",
      })
      .done((data) => {
        var new_instance_can_list = instance_can_list.filter( m => select_can_list.every( n => n != m));
        self.setState({instance_can_list: [...instance_can_list, ...data],
         instance_can_list: new_instance_can_list,
         instance_pack_list: [...instance_pack_list, ...data],
         select_can_list: [],
       })
      })
      .fail( msg => {
         message.error(msg || '网络异常，请稍后再试')
      })
    }
  }
  onLogistic(device_id, type){
    let { instance_pack_list, current_logistic_step } = this.state;
    let self = this;
    let final_dest = "0";
    if(current_logistic_step == 2){
      final_dest = "1"
    }
    handleProductEvent({
      type,
      existing_instances: instance_pack_list.map(m => ({id: m.toString()})),
      final_dest,
      device_id: device_id,
      tokenDevice: device_id,
    })
    .done((data) => {
      if(current_logistic_step == 2){
        self.setState({instance_pack_list: []})
      }
         self.setState({
           current_logistic_step: current_logistic_step + 1,
        })
    })
    .fail( msg => {
       message.error(msg || '网络异常，请稍后再试')
    })
  }
  getIngre(type){
    var { porkType, pickleType, bottleType} = this.state;
    this.setState({current_type: type, current_step: 0, current_divides: 1})
    switch(type) {
      case porkType:
        this.setState({
          current_steps: porkSteps,
          current_img_src: '/src/images/pig.png',
          current_divide_img_src: '/src/images/meat3.png',
        });break;
      case pickleType:
        this.setState({
          current_steps: pickleSteps,
          current_divide_img_src: '/src/images/pickle.png',
          current_img_src: '/src/images/greens.png',
        });break;
      case bottleType:
        this.setState({
          current_steps: bottleSteps,
          current_img_src: '/src/images/jar.png',
          current_divide_img_src: '/src/images/bottle3.png',
        });break;
      default:
        this.setState({current_steps: []});break;
    }
  }
  next() {
      let { selected_type, current_step, current_divides, current_type, porkType,pickleType, bottleType,
        instance_pork_list, instance_bottle_list, instance_pickle_list, step1_result_id } = this.state;
      var self = this;
      if(!selected_type){
         message.warning('请选择一种原材料！');return;
      }else{
        let instance_type;
        switch(current_step){
          case 0:
            handleProductEvent(
              { type: '5',
                tokenDevice: "1",
                new_instances: [{pid: selected_type.toString(), instance_type: "66"}]})
            .done( data => {
              this.setState({ current_step: this.state.current_step + 1, step1_result_id: data });
              if(current_type == bottleType){
                var flyImg = $('#divide-img').get(0);
                var target = $('#bottle-badg').get(0);
                this.toFlyImag(flyImg, target);
                this.setState({instance_bottle_list: [...instance_bottle_list, ...data]})
              }
            })
            .fail( msg => {
              message.error(msg || '网络异常，请稍后再试')
            })
            break;
          case 1:
            if(current_divides <= 0){
              message.warning('请输入分隔的块数'); return;
            }
            let i = 0, new_instances = [], pid = "115", type = "9";
            if(current_type == porkType){
              pid="115";
              type="9";
            }else if(current_type == pickleType){
              pid = "116"
              type = "10";
            }
            while(i < current_divides){
              i++;
              new_instances.push({
                pid,
                instance_type: '66'
              })
            }
            if(current_type != bottleType){
              handleProductEvent(
                {
                  tokenDevice: "1",
                  type,
                  new_instances,
                  existing_instances:  step1_result_id.map( m => ({id: m.toString()}))
              }
                )
              .done( data => {
                switch(current_type){
                  case porkType:
                    instance_pork_list = [...instance_pork_list, ...data];
                    this.setState({ current_step: this.state.current_step + 1,
                    instance_pork_list });
                    var flyImg = $('#divide-img').get(0);
                    var target = $('#pork-badg').get(0);
                    this.toFlyImag(flyImg, target);break;
                  case pickleType:
                    instance_pickle_list = [...instance_pickle_list, ...data];
                    this.setState({ current_step: this.state.current_step + 1,
                    instance_pickle_list });
                    var flyImg = $('#divide-img').get(0);
                    var target = $('#pickle-badg').get(0);
                    this.toFlyImag(flyImg, target);break;
                  default:break;
                }
              })
              .fail( msg => {
                message.error( msg || '网络异常，请稍后再试')
              })
            }
            break;
          default: return;break;
        }
      }
    }
    handleDestChange(e){
      this.setState({shipdest: e});
    }
  toFlyImag(flyImg, target){
    var self = this;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    /*var flyImg = $('#divide-img').get(0);
    var target;
    var { porkType, pickleType, bottleType, current_type} = this.state;
    switch(current_type){
      case porkType:
        target = $('#pork-badg').get(0);break;
      case pickleType:
        target = $('#pickle-badg').get(0);break;
      case bottleType:
        target = $('#bottle-badg').get(0);break;
      default:;break;
    }*/
    flyImg.style.visibility = 'hidden';
    flyImg.style.display = 'block';
    flyImg.style.left = event.clientX + scrollLeft + "px";
    flyImg.style.top = event.clientY + scrollTop - 30 + "px";
    flyImg.style.visibility = "visible";
    var myParabola = funParabola(flyImg, target, {
      speed: 800,
      curvature: 0.01,
      complete: function() {
        let { meat_count, pickle_count, bottle_count, current_divides, current_type,
          porkType, pickleType, bottleType } = self.state;

        flyImg.style.visibility = "hidden";
        switch(current_type){
          case porkType:
            self.setState({meat_count: meat_count + current_divides});break;
          case pickleType:
            self.setState({pickle_count: pickle_count + current_divides});break;
          case bottleType:
            self.setState({bottle_count: bottle_count + current_divides});break;
          default:;break;
        }
      }
    });
    // 需要重定位
    myParabola.position().move();
  }
  divide(value){
    this.setState({current_divides: value})
  }
  openPanel(panelKey){
    message.success('小助手提示：已在下方为您打开相应的工作面板^_^!', 5);
    if(panelKey == 'logistic'){
      this.setState({current_logistic_step: 0});
    }
    this.setState({activeKey: panelKey});
  }
  resetStep(){
    this.setState({
      current_step: null,
      current_steps: [],
      current_type: null,
      current_img_src: '',
      selected_type:null,
      current_divides: 0,
    })
  }
}