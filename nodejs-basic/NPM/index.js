const npm = require('lodash');
const myOddEvenArray = npm.partition([1, 2, 3, 4, 5, 6], (n) => n % 2);
 
console.log(myOddEvenArray);