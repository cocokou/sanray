export default function Promise(async_task){
  if(typeof async_task == 'function'){
    var $d = $.Deferred();
    async_task($d.resolve, $d.reject);
    return $d;
  }
}