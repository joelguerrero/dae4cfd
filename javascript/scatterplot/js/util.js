function clone(obj){
    /*Return a copy of 'obj'*/
    var result = {};
    Object.keys(obj).map(function(key){result[key] = copyValue(obj[key]);});
    return result;
}
function copyValue(value){
    /*Return a copy of 'value'
        'value' be different types supported
    */
    var primitives = ['string', 'number', 'undefined', 'boolean', 'function'];
    if(primitives.indexOf(typeof value) != -1){
        return value;
    }
    if(Array.isArray(value))
        return value.map(function(current){return copyValue(current);});
    if(typeof value === 'object')
        return clone(value);
}

var Dictionary = function (keys){
      var dict = this;
      dict.keyCount = keys.length;
      dict.keys = keys;
      keys.map(function(key, idx){dict[key] = [];});
}
Dictionary.prototype.insert = function(keys, values){
        var dict = this;
        if(keys.length === dict.keyCount){
            keys.map(function(key, idx){
                dict[key].push(values[idx]);
            });
        }
}

function dictReader(fileContent, delim, fields){
        var result = {};
        var lines = fileContent.split('\n');
        lines.forEach(function(line, idx){
            if(idx == 0){   
                if(fields === undefined){ //First row always contains the column headers
                    fields = line.trim().split(delim);
                    result = new Dictionary(fields)
                    return;
                }
                result = new Dictionary(fields)
                row = line.trim().split(delim);
                result.insert(fields, row);
                return
            }
            
            row = line.trim().split(delim);
            result.insert(fields, row);        
        });
        return result;
}
function dict(keys, values){
    var d = this;
    values.forEach(function(value, i){
        d[keys[i]] = parseFloat(value);
    });
}
function csvDictReader(fileContent, delim, header){
        var fields, currentValues, result = [];
        var lines = fileContent.split('\n');
        lines.forEach(function(line, idx){
            if(idx == 0){ 
                    var firstRow = line.trim().split(delim);
                    fields = ['lineNo'];
                    if(header){  //If the first row is treated as a header
                        fields = fields.concat(firstRow);
                        return; //In effect, continue to the next iteration
                    }
                    fields = fields.concat(firstRow.map(function(value, i){return "x"+i;}));
                    idx = idx+1;    //to enforce 'lineNo' to start from 1
            }

            currentValues = line.trim().split(delim);
            currentValues = [idx].concat(currentValues);
            if(currentValues.length === fields.length){
                result.push(new dict(fields, currentValues));
            }
        });
        return result;  //An array of objects
}
function csvDictWriter(dictArray, delim){
    /*Takes an array of objects and returns a string where the 
     * each object's values are concatenated by 'delim' which in turn 
     * are concatenated by the newline character '\n'
     * */
    var row, rows;
    var fields = Object.keys(dictArray[0]);
    rows = fields.join(delim) + '\n'; 
    dictArray.forEach(function(obj, i){
        row = [];
        fields.forEach(function(field){
            row.push(obj[field]);
        });

        rows += row.join(delim) + '\n';
    });

    return rows;
}

function max(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, max is
        // undefined and is thus made the maximum element in the array
        if (x[i] > value || value === undefined) {
            value = x[i];
        }
    }
    return value;
}
function min(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, min is
        // undefined and is thus made the minimum element in the array
        if (x[i] < value || value === undefined) {
            value = x[i];
        }
    }
    return value;
}

function mean(x) {
    // The mean of no numbers is null
    if (x.length === 0) { return null; }

    return sum(x) / x.length;
}


function variance(x) {
    // The variance of no numbers is null
    if (x.length === 0) { return null; }

    var meanValue = mean(x),
        deviations = [];

    // Make a list of squared deviations from the mean.
    for (var i = 0; i < x.length; i++) {
        deviations.push(Math.pow(x[i] - meanValue, 2));
    }

    // Find the mean value of that list
    return mean(deviations);
}


/**
 * The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the variance.
 *
 * @param {Array<number>} x input
 * @returns {number} standard deviation
 */
function standardDeviation(x) {
    // The standard deviation of no numbers is null
    if (x.length === 0) { return null; }

    return Math.sqrt(variance(x));
}

function sum(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

function trim(num, dPoints){
    /* if 'num' has decimal points, trim upto 'dPoints'*/
    var p = (num.toString().split('.')[1] || []).length;
    return (p > dPoints)?parseFloat(num.toFixed(dPoints)):num;
}
