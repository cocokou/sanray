import createBrowserHistory from 'history/lib/createBrowserHistory'
import nav_config from 'config/nav.config';

const history = createBrowserHistory();

export function go(path){
  if( nav_config.some( m => m.link.some(n => n.link == path) ) ){
    history.push(path);
    // $('#nav').find('a').each(function(){
    //   if(this.getAttribute('href') == path){
    //     $(this).trigger('click')
    //   }
    // });
  }else{
    throw Error('error path');
  }
}

export default history;