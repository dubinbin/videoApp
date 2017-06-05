//判断数字是否在该数组
export function inArray(arr, val){ 
	for(var i=0; i<arr.length; i++){ 
	  if(arr[i] == val) 
	     return true; 
	 } 
	return false; 
}

//移除x项，x为传入值
export function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
       break;
    }
  }
}
