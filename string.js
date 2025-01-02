const reverseStr = (str)=>{
    str = str.trim();
  let newStr="";

  for(let i=str.length-1; i>=0; i--){
    newStr +=str[i];
  }

   return newStr
}

console.log(reverseStr("zahid"))