'use strict';

/*********************************************************************************************
 *                                                                                           *
 * Plese read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array    *
 *                                                                                           *
 * NOTE : Please do not use loops! All tasks can be implmeneted using standard Array methods *
 *                                                                                           *
 *********************************************************************************************/

 
/**
 * Returns an index of the specified element in array or -1 if element is not found
 * 
 * @param {array} arr
 * @param {any} value
 * @return {number}
 * 
 * @example
 *    ['Ace', 10, true], 10    => 1 
 *    ['Array', 'Number', 'string'], 'Date'    => -1 
 *    [0, 1, 2, 3, 4, 5], 5    => 5
 */
function findElement(arr, value) {
    return arr.indexOf(value);
}

/**
 * Generates an array of odd numbers of the specified length
 * 
 * @param {number} len
 * @return {array}
 * 
 * @example
 *    1 => [ 1 ] 
 *    2 => [ 1, 3 ] 
 *    5 => [ 1, 3, 5, 7, 9 ]
 */
function generateOdds(len) {
    function odd(num) {
        return function() {
            num += 2;
            return num;
        }
    }

    var num = odd(1);

    var arr = Array.apply(null, Array(len)).map(function() { 
        return num();
    });
    
    arr.unshift(1);
    arr.pop();
    return arr;
}

/**
 * Returns the doubled array - elements of the specified array are repeated twice using original order
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    ['Ace', 10, true]  => ['Ace', 10, true,   'Ace', 10, true]  
 *    [0, 1, 2, 3, 4, 5] => [0, 1, 2, 3, 4, 5,   0, 1, 2, 3, 4, 5]
 *    [] => [] 
 */
function doubleArray(arr) {
    return arr.concat(arr);
}


/**
 * Returns an array of positive numbers from the specified array in original order
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [ 0, 1, 2, 3, 4, 5 ] => [ 1, 2, 3, 4, 5 ]
 *    [-1, 2, -5, -4, 0] => [ 2 ]
 *    [] => [] 
 */
function getArrayOfPositives(arr) {
    return arr.filter(function(num) {
        return num > 0;
    });
}

/**
 * Returns the array with strings only in the specified array (in original order)
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [ 0, 1, 'cat', 3, true, 'dog' ] => [ 'cat', 'dog' ]
 *    [ 1, 2, 3, 4, 5 ] => []
 *    [ 'cat, 'dog', 'raccon' ] => [ 'cat', 'dog', 'racoon' ]
 */
function getArrayOfStrings(arr) {
    return arr.filter(function(elem) {
        return typeof elem === 'string';
    });
}

/**
 * Removes falsy values from the specified array
 * Falsy values: false, null, 0, "", undefined, and NaN.
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#Description)
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [ 0, false, 'cat', NaN, true, '' ] => [ 'cat', true ]
 *    [ 1, 2, 3, 4, 5, 'false' ]         => [ 1, 2, 3, 4, 5, 'false' ]
 *    [ false, 0, NaN, '', undefined ]   => [ ]
 */
function removeFalsyValues(arr) {
    return arr.filter(function(elem) {
        return elem;
    });
}

/**
 * Returns the array of useprcase strings from the specified array
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [ 'permanent-internship', 'glutinous-shriek', 'multiplicative-elevation' ] => [ 'PERMANENT-INTERNSHIP', 'GLUTINOUS-SHRIEK', 'MULTIPLICATIVE-ELEVATION' ]
 *    [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]  => [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]
 */
function getUpperCaseStrings(arr) {
    return arr.map(function(elem) {
        return elem.toUpperCase();
    });
}


/**
 * Returns the array of string lengths from the specified string array.
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [ '', 'a', 'bc', 'def', 'ghij' ]  => [ 0, 1, 2, 3, 4 ]
 *    [ 'angular', 'react', 'ember' ] => [ 7, 5, 5 ]
 */
function getStringsLength(arr) {
    return arr.map(function(elem) {
        return elem.length;
    });
}

/**
 * Inserts the item into specified array at specified index
 * 
 * @param {array} arr
 * @param {any} item
 * @param {number} index 
 * 
 * @example
 *    [ 1, 3, 4, 5 ], 2, 1  => [ 1, 2, 3, 4, 5 ]
 *    [ 1, 'b', 'c'], 0, 'x'  => [ 'x', 1, 'b', 'c' ]
 */
function insertItem(arr, item, index) {
    return arr.splice(index, 0, item);
}

/**
 * Returns the n first items of the specified array
 * 
 * @param {array} arr
 * @param {number} n 
 * 
 * @example
 *    [ 1, 3, 4, 5 ], 2  => [ 1, 2 ]
 *    [ 'a', 'b', 'c', 'd'], 3  => [ 'a', 'b', 'c' ]
 */
function getHead(arr, n) {
    return arr.slice(0, n);
}


/**
* Returns the n last items of the specified array
* 
* @param {array} arr
* @param {number} n 
 * 
 * @example
 *    [ 1, 3, 4, 5 ], 2  => [ 4, 5 ]
 *    [ 'a', 'b', 'c', 'd'], 3  => [ 'b', 'c', 'd' ]
 */
function getTail(arr, n) {
    return arr.reverse().slice(0, n).reverse();
}


/**
 * Returns CSV represebtation of two-dimentional numeric array.
 * https://en.wikipedia.org/wiki/Comma-separated_values
 * 
 * @param {array} arr
 * @return {string}
 * 
 * @example
 *    [
 *       [  0, 1, 2, 3, 4 ],
 *       [ 10,11,12,13,14 ],
 *       [ 20,21,22,23,24 ],
 *       [ 30,31,32,33,34 ]
 *    ] 
 *           => 
 *     '0,1,2,3,4\n'
 *    +'10,11,12,13,14\n'
 *    +'20,21,22,23,24\n'
 *    +'30,31,32,33,34'
 */
function toCsvText(arr) {
    var str = "";
    var ret = arr.reduce(function(prev, curr) {
        if (typeof prev == "string") {
            str += "\n";
            str += curr.join(",");
        } else {
            str += prev.join(",");
            str += "\n";
            str += curr.join(",");
        }

        return str;
    });

    return ret;
}

/**
 * Transforms the numeric array into the according array of squares:
 *   f(x) = x * x
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *   [ 0, 1, 2, 3, 4, 5 ] => [ 0, 1, 4, 9, 16, 25 ]
 *   [ 10, 100, -1 ]      => [ 100, 10000, 1 ]
 */
function toArrayOfSquares(arr) {
    return arr.map(function(num) {
        return num * num;
    });
}


/**
 * Transforms the numeric array to the according moving sum array:
 *     f[n] = x[0] + x[1] + x[2] +...+ x[n] 
 *  or f[n] = f[n-1] + x[n]
 * 
 * @param {array} arr
 * @return {array}
 * 
 * Example :
 *   [ 1, 1, 1, 1, 1 ]        => [ 1, 2, 3, 4, 5 ]
 *   [ 10, -10, 10, -10, 10 ] => [ 10, 0, 10, 0, 10 ]
 *   [ 0, 0, 0, 0, 0]         => [ 0, 0, 0, 0, 0] 
 *   [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] => [ 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 ]
 */
function getMovingSum(arr) {
    var newArr = [];
    newArr.push(arr[0]);
    arr.reduce(function(prev, curr) {
        newArr.push(prev + curr);
        return prev + curr;
    });
    return newArr;
}

/**
 * Returns every second item from the specified array:
 * 
 * @param {array} arr
 * @return {array}
 * 
 * Example :
 * [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] => [ 2, 4, 6, 8, 10 ]
 * [ 'a', 'b', 'c' , null ]  => [ "b", null ]
 * [ "a" ] => []
 */
function getSecondItems(arr) {
    var newArr = arr.filter(function(num, ind) {
        if(ind % 2) {
            if (num == null) {
                return !num;
            }
            return num;
        }
    });

    return newArr;
}


/**
 * Propagates every item in sequence its position times
 * Returns an array that consists of: one first item, two second items, tree third items etc. 
 * 
 * @param {array} arr 
 * @return {array}
 * 
 * @example :
 *  [] => []
 *  [ 1 ] => [ 1 ]
 *  [ 'a', 'b' ] => [ 'a', 'b','b' ]
 *  [ 'a', 'b', 'c', null ] => [ 'a', 'b','b', 'c','c','c',  null,null,null,null ]
 *  [ 1,2,3,4,5 ] => [ 1, 2,2, 3,3,3, 4,4,4,4, 5,5,5,5,5 ]
 */
function propagateItemsByPositionIndex(arr) {
    var newArr = [];

    if(arr.length == 0) {
        return [];
    }

    function newSubArr(elem, ind) {
        return Array.apply(null, Array(ind)).map(function() { 
                    return elem;
                });
    }

    arr.map(function(num, index) {
        newArr = newArr.concat(newSubArr(num, index + 1));       
    });

    return newArr;
}

/** 
 * Returns the 3 largest numbers from the specified array
 * 
 * @param {array} arr
 * @return {array}
 *
 * @example
 *   [] => []
 *   [ 1, 2 ] => [ 2, 1 ]
 *   [ 1, 2, 3 ] => [ 3, 2, 1 ]
 *   [ 1,2,3,4,5,6,7,8,9,10 ] => [ 10, 9, 8 ]
 *   [ 10, 10, 10, 10 ] => [ 10, 10, 10 ]
 */
function get3TopItems(arr) {
    if(arr.length == 0) { return arr;}
    if(arr.length <= 3) { return arr.reverse();}

    arr.sort(function(a,b) {
        return a - b;
    });

    return arr.reverse().slice(0, 3);
}
 
 
/**  
 * Returns the number of positive numbers from specified array
 * 
 * @param {array} arr
 * @return {number}
 * 
 * @example
 *   [ ]          => 0
 *   [ -1, 0, 1 ] => 1
 *   [ 1, 2, 3]   => 3
 *   [ null, 1, 'elephant' ] => 1
 */
function getPositivesCount(arr) {
    var newArr = arr.filter(function(num) {
        return num > 0;
    });
    return newArr.length;
}
 
/** 
 * Sorts digit names
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *   [] => []
 *   [ 'nine','one' ]                 => [ 'one', 'nine' ]
 *   [ 'one','two','three' ]          => [ 'one','two', 'three' ]
 *   [ 'nine','eight','nine','eight'] => [ 'eight','eight','nine','nine']
 *   [ 'one','one','one','zero' ]     => [ 'zero','one','one','one' ]
 */
function sortDigitNamesByNumericOrder(arr) {
    var hash = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    };

    var hashNum = {
        "0": "zero",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine"
    };

    var newArr = arr.map(function(num) {
        return hash[num];
    });

    newArr.sort(function(a, b) {
        return a - b;
    });

    var retArr = newArr.map(function(num) {
        return hashNum[num];
    });

    return retArr;
}

/** 
 * Returns the sum of all items in the specified array of numbers
 * 
 * @param {array} arr
 * @return {number}
 * 
 * @example
 *   [] => 0
 *   [ 1, 2, 3 ]           => 6
 *   [ -1, 1, -1, 1 ]      => 0
 *   [ 1, 10, 100, 1000 ]  => 1111
 */
function getItemsSum(arr) {
    if (arr.length == 0) { 
        return 0;
    }

    var sum = arr.reduce(function(prev, curr) {
        return prev + curr;
    });

    return sum;
}
 
/** 
 * Returns the number of all falsy value in the specified array
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *  [] => 0
 *  [ 1, '', 3 ] => 1
 *  [ -1, 'false', null, 0 ] => 2
 *  [ null, undefined, NaN, false, 0, '' ]  => 6
 */
function getFalsyValuesCount(arr) {
    if (arr.length == 0) { 
        return 0;
    }

    var num = 0;

    arr.map(function(elem) {
        if (!elem) {
            num++;
        }

        return;
    });

    return num;
}

/**
 * Returns a number of all occurences of the specified item in an array  
 * 
 * @param {array} arr
 * @param {any} item 
 * @return {number}
 * 
 * @example
 *    [ 0, 0, 1, 1, 1, 2 ], 1 => 3
 *    [ 1, 2, 3, 4, 5 ], 0 => 0
 *    [ 'a','b','c','c' ], 'c'=> 2
 *    [ null, undefined, null ], null => 2 
 *    [ true, 0, 1, 'true' ], true => 1
 */
function findAllOccurences(arr, item) {
    var occurences = 0;

    arr.map(function(elem) {
        if(elem === item) {
            occurences++;
        }

        return;
    });

    return occurences;
}

/**
 * Concatenates all elements from specified array into single string with ',' delimeter  
 * 
 * @param {array} arr 
 * @return {string}
 * 
 * @example
 *    [0, false, 'cat', NaN, true, '']  => '0,false,cat,NaN,true,'
 *    [1, 2, 3, 4, 5]                   => '1,2,3,4,5'
 *    ['rock', 'paper', 'scissors']     => 'rock,paper,scissors'
 */
function toStringList(arr) {
   return arr.join(",");
}


/**
 * Sorts the specified array by country name first and city name (if countries are equal) in ascending order.
 * 
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]  
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 */
function sortCitiesArray(arr) {
    arr.sort(function(a, b) {
        if(a.country > b.country) {
            return 1;
        }
        
        if (a.country < b.country) {
            return -1;
        }

        if (a.country == b.country) {
            if (a.city > b.city) {
                return 1;
            }
            return -1;
        }        
    });
    // console.log(arr);

    return arr;
}

/**
 * Creates an indentity matrix of the specified size
 * 
 * @param {number} n
 * @return {array}
 * 
 * @example
 *     1  => [[1]]
 *  
 *     2 => [[1,0],
 *           [0,1]]
 * 
 *          [[1,0,0,0,0],
 *           [0,1,0,0,0],
 *     5 =>  [0,0,1,0,0],
 *           [0,0,0,1,0],
 *           [0,0,0,0,1]]   
 */
function getIdentityMatrix(n) {
    var index = -1;

    function addMatrixRow(len, outerInd) {
        return Array.apply(null, Array(n)).map(function(elem, innerInd) {
            if(outerInd == innerInd) {
                return 1;
            }
            return 0;
        }); 
    }

    var matrix = Array.apply(null, Array(n)).map(function() { 
        index++;
        return addMatrixRow(n, index);
    });
    // console.log(matrix);
    return matrix;
}

/**
 * Creates an array of integers from the specified start to end (inclusive)
 * 
 * @param {number} start
 * @param {number} end
 * @return {array}
 * 
 * @example
 *     1, 5  => [ 1, 2, 3, 4, 5 ]
 *    -2, 2  => [ -2, -1, 0, 1, 2 ]
 *     0, 100 => [ 0, 1, 2, ..., 100 ]
 *     3, 3   => [ 3 ]
 */
function getIntervalArray(start, end) {
    var len = end - start + 1;
    var num = start - 1;

    var newArr = Array.apply(null, Array(len)).map(function() { 
        num++;
        return num;
    });
    // console.log(newArr);
    return newArr;
}

/**
 * Returns array containing only unique values from the specified array.
 *
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *   [ 1, 2, 3, 3, 2, 1 ] => [ 1, 2, 3 ]
 *   [ 'a', 'a', 'a', 'a' ]  => [ 'a' ]
 *   [ 1, 1, 2, 2, 3, 3, 4, 4] => [ 1, 2, 3, 4]
 */
function distinct(arr) {
    var unique = [];
    arr.map(function(num) {
        if (!unique.includes(num)) {
            unique.push(num);
        }
    });
    return unique;
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ], 
 *     item => item.country, 
 *     item => item.city
 *   )
 *            => 
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"], 
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
    var miniMap = new Map();

    array.map(function(elem) {
        if (miniMap.has(keySelector(elem))) {
            miniMap.get(keySelector(elem)).push(valueSelector(elem));
        } else {
            let arr = [];
            arr.push(valueSelector(elem));
            miniMap.set(keySelector(elem), arr);
        }
    });

    return miniMap;
}


/**
 * Projects each element of the specified array to a sequence and flattens the resulting sequences into one array.
 *
 * @param {array} arr
 * @param {Function} childrenSelector, a transform function to apply to each element that returns an array of children
 * @return {array}
 * 
 * @example
 *   [[1, 2], [3, 4], [5, 6]], (x) => x     =>   [ 1, 2, 3, 4, 5, 6 ]
 *   ['one','two','three'], x=>x.split('')  =>   ['o','n','e','t','w','o','t','h','r','e','e']
 */
function selectMany(arr, childrenSelector) {
    var newArr = [];
    arr.map(function(elem) {
        newArr = newArr.concat(childrenSelector(elem));
    });
    return newArr;
}


/**
 * Returns an element from the multidimentional array by the specified indexes.
 *
 * @param {array} arr
 * @param {array} indexes
 * @return {any} element from array
 * 
 * @example
 *   [[1, 2], [3, 4], [5, 6]], [0,0]  => 1        (arr[0][0]) 
 *   ['one','two','three'], [2]       => 'three'  (arr[2]) 
 *   [[[ 1, 2, 3]]], [ 0, 0, 1 ]      => 2        (arr[0][0][1])
 */
function getElementByIndexes(arr, indexes) {
    if (indexes.length == 1) {
        return arr[indexes[0]];
    }

    if (indexes.length == 2) {
        return arr[indexes[0]][indexes[1]];    
    }

    if (indexes.length == 3) {
        return arr[indexes[0]][indexes[1]][indexes[2]];    
    }
}


/**
 * Swaps the head and tail of the specified array:
 * the head (first half) of array move to the end, the tail (last half) move to the start. 
 * The middle element (if exists) leave on the same position.
 * 
 *  
 * @param {array} arr
 * @return {array}
 * 
 * @example
 *   [ 1, 2, 3, 4, 5 ]   =>  [ 4, 5, 3, 1, 2 ]
 *    \----/   \----/         
 *     head     tail 
 *
 *   [ 1, 2 ]  => [ 2, 1 ] 
 *   [ 1, 2, 3, 4, 5, 6, 7, 8 ]   =>  [ 5, 6, 7, 8, 1, 2, 3, 4 ]   
 * 
 */
function swapHeadAndTail(arr) {
    var left = [];
    var right = [];
    var mid;
    
    if (!(arr.length % 2)) {
        left = arr.slice(0, arr.length / 2);
        right = arr.slice(arr.length / 2, arr.length);
        return right.concat(left);  
    }

    if (arr.length % 2) {
        mid = Math.floor(arr.length / 2);
        left = arr.slice(0, mid);
        right = arr.slice(mid + 1, arr.length);
        return right.concat(arr[mid], left);  
    }
}


module.exports = {
    findElement: findElement,
    generateOdds: generateOdds,
    doubleArray: doubleArray,
    getArrayOfPositives: getArrayOfPositives,
    getArrayOfStrings: getArrayOfStrings,
    removeFalsyValues: removeFalsyValues,
    getUpperCaseStrings: getUpperCaseStrings,
    getStringsLength: getStringsLength,
    insertItem: insertItem,
    getHead: getHead,
    getTail: getTail,
    toCsvText: toCsvText,
    toStringList: toStringList,
    toArrayOfSquares: toArrayOfSquares,
    getMovingSum: getMovingSum,
    getSecondItems: getSecondItems,
    propagateItemsByPositionIndex: propagateItemsByPositionIndex,
    get3TopItems: get3TopItems,
    getPositivesCount: getPositivesCount,
    sortDigitNamesByNumericOrder: sortDigitNamesByNumericOrder,
    getItemsSum: getItemsSum,
    getFalsyValuesCount: getFalsyValuesCount,
    findAllOccurences: findAllOccurences,
    sortCitiesArray: sortCitiesArray,
    getIdentityMatrix: getIdentityMatrix,
    getIntervalArray: getIntervalArray,
    distinct: distinct,
    group: group,
    selectMany: selectMany,
    getElementByIndexes: getElementByIndexes,
    swapHeadAndTail: swapHeadAndTail
};
