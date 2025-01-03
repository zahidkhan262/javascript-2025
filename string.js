// reverse string 1
const reverseStr = (str)=>{
    str = str.trim();
    let newStr="";
    for(let i=str.length-1; i>=0; i--){
        newStr +=str[i];
    }
    return newStr
}

console.log(reverseStr("zahid"));

//Longest Common Prefix 2

const findLongestCommonPrefix =(str)=>{
    if (str.length === 0) return "";
    let prefix = str[0];
    console.log(prefix,"pre")
    for(let i=0; i<=str.length; i++){
        for(let char of prefix[i]){
            console.log(char,"char")
        }
    }
}

console.log(findLongestCommonPrefix(["flower","fly","flick","flow"]))
