'use strict';

/**
 * The [sum](https://en.wikipedia.org/wiki/Summation) of an array
 * is the result of adding all numbers together, starting from zero.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * console.log(sum([1, 2, 3])); // 6
 */
function sum(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

module.exports = sum;
