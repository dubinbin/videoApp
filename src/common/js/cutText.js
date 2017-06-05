//截断文字转换为....
export function cutstr(str, len)
{
   var str_length = 0;
   var str_len = 0;
   var str_cut = new String();
   var str_len = str.length;
      for(var i = 0;i<str_len;i++)
     {
        var a = str.charAt(i);
        str_length++;
        if(escape(a).length > 4)
        {
         str_length++;
         }
         str_cut = str_cut.concat(a);
         if(str_length>=len)
         {
         str_cut = str_cut.concat("...");
         return str_cut;
         }
    }
    if(str_length<len){
     return  str;
    }
}