import { post } from 'utils/request';
import config from 'config/app.config';

const url = config.ajax;

//获取产品列表
export function getProductList(){
  return post(url, 'get_product_list', { companyId: config.default_company_id });
}

export function getInstanceLocationList(params){
  return post(url, 'get_product_usage_stat_by_xy', params);
}

export function getProductIngredients(){
  return post(url, 'get_product_ingredients', { pid: config.default_pid_id})
}

export function handleProductEvent(params){
  return post(url, 'handle_product_event', params);
}