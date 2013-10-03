/*
 * utils.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */
 
 //
 // Shallow copy properties from n objects to destObj
 //
 var extend = function (destObj) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      destObj[key] = arguments[i][key];
    }
  }
  return destObj;
};


//
// Expose
//
exports.extend = extend;
