// find the max and min element from the array
const data = [22, 14, 8, 17, 35, 3];
// first
const findMaxAndMinEle = (arr) => {
  let max = arr[0];
  let min = arr[0];

  for (let data of arr) {
    if (max < data) {
      max = data;
    }
    if (data < min) {
      min = data;
    }
  }
  return { min, max };
};


console.log(findMaxAndMinEle(data), "output"); // { min: 3, max: 35 } output

// second
function getMinMax(arr) {
  const minmax = {};
  arr.sort((a, b) => a - b);
  minmax.min = arr[0];
  minmax.max = arr[arr.length - 1];

  return minmax;
}

console.log(getMinMax(data)); //{ min: 3, max: 35 }

// Input [22, 14, 8, 17, 35, 3];
// Expected output: [3, 35, 17, 8, 14, 22]

// third
const reverseArray = (arr) => {
  let revArr = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    revArr.push(arr[i]);
  }

  return revArr;
};

console.log(reverseArray(data), "reverse the array"); //but got [ 35, 22, 17, 14, 8, 3 ] reverse the array

const data1 = [1, 4, 3, 2, 6, 5];

// fourth

const reverseArray1 = (arr) => {
  // debugger
  const n = arr.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    // Swap elements at i and (n - 1 - i)
    [arr[i], arr[n - 1 - i]] = [arr[n - 1 - i], arr[i]];
  }

  return arr;
};

console.log(reverseArray1(data1)); // Output: [5, 6, 2, 3, 4, 1]

// fifth

const summ = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const findSubArray = (arr, target) => {
  // debugger
  let left = 0;
  let currentSum = 0;
  for (let right = 0; right < arr.length; right++) {
    currentSum += arr[right];

    while (currentSum > target && left <= right) {
      currentSum -= arr[left];
      left++;
    }

    if (currentSum === target) {
      return arr.slice(left, right + 1);
    }
  }
  return [];
};

let expected = 15;
const subarr = [1, 4, 20, 3, 10, 5];
console.log(findSubArray(subarr, expected), "subarray");

var containsDuplicate = function (nums) {
  const hash = {};
  for (let val of nums) {
    if (hash[val]) {
      return true;
    } else {
      hash[val] = true;
    }
  }
  return false;
};

console.log(containsDuplicate([1, 2, 3, 4, 7]), "dup");


var containsDuplicates = function (nums) {
  const uniqueNums = new Set(nums);
  return uniqueNums.size !== nums.length;
};

console.log(containsDuplicates([1, 2, 3, 4, 7, 7])); // Output: true (duplicate found)
console.log(containsDuplicates([1, 2, 3, 4])); // Output: false (no duplicates)

// Plus one

var plusOne = function (digits) {
  let lastIndex = digits.length - 1;
  for (let i = lastIndex; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
};

console.log(plusOne([9, 9, 9, 9]), "plus one");

// find index of given number if found in array or not in both case return index;

const findIndexPosition = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return arr[mid];
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
console.log(findIndexPosition([1, 3, 5, 6], 8));



var containsNearbyDuplicate = function (nums, k) {
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in hash && Math.abs(hash[nums[i]] - i) <= k) {
      return true;
    } else {
      hash[nums[i]] = i;
    }
  }
  return false;
};

console.log(containsNearbyDuplicate([1, 0, 1, 1], 1), "another");

// another way

const containsNearbyDuplicates = (nums, k) => {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }
  return false;
};
console.log(containsNearbyDuplicates([1, 0, 1, 1], 1), "others");



var maxProfit = function (prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      let profit = prices[i] - minPrice;
      maxProfit = Math.max(maxProfit, profit);
    }
  }
  return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices), "maxProfit");


var moveZeroes = function (nums) {
  let lastIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[lastIndex], nums[i]] = [nums[i], nums[lastIndex]];
      lastIndex++;
    }
  }
  return nums;
};

console.log(moveZeroes([1, 0, 1, 1]), "movezeros");

// check anagram
const checkAnagram = (str1,str2)=>{

  const checkStr = (str) => str.toLowerCase().split('').sort().join('');

  return checkStr(str1) === checkStr(str2)

}
console.log(checkAnagram("india","aiden"),"anagram")

//check max element
const findMaxEle = (arr)=> {
  let max =0;
  for(let i=0; i<=arr.length; i++){
    if(max<arr[i]) max = arr[i]
  }
  return max
}
console.log(findMaxEle([20,3,4,5,6]),"find min ele");

//check min element
const findMinEle = (arr)=> {
  let min =arr[0];
  for(let i=0; i<=arr.length; i++){
    if(min>arr[i]) min = arr[i]
  }
  return min
}
console.log(findMinEle([20,3,4,5,6]),"find min ele");

// Write a function that prints numbers from 1 to 100. For multiples of 3, print "Fizz", 
// for multiples of 5, print "Buzz", and for multiples of both, print "FizzBuzz".
console.log("----------------")
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}
// fizzBuzz();
console.log("----------------")

// console.log("----------------");

// const findNonRepeatingChar = (str) =>{
//   for(let char of str)
//     if(str.indexOf(char) === str.lastIndexOf(char)) return char
//   return null
// }

// console.log(findNonRepeatingChar("javascriptj"),"non repeating")

// console.log("----------------") 

console.log("----------------");

const findNonRepeatingChar = (str) =>{
  const hash = {};
  for(let char of str)
    hash[char] = (hash[char]||0) + 1;
  for(let char of str)
  if(hash[char] === 1) return char
  return null
}

console.log(findNonRepeatingChar("javascriptj"),"non repeating")

console.log("----------------") 
console.log(Math.sqrt(18),"sqrt")



