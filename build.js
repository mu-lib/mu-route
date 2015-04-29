define([], function () {
  "use strict";

  var UNDEFINED;
  var RE_TEST = /:(?!\?)/;
  var RE_REPLACE = /:.*/;

  function replace (data) {
    return this.replace(/(?::(\w+)\??)|(?:\(([^\)]+)\)\??)/g, function (match, key, pattern) {
      var result;

      if (pattern !== UNDEFINED) {
        result = replace.call(pattern, data);

        if (result === pattern) {
          result = match;
        }
      }
      else if (data.hasOwnProperty(key)) {
        result = data[key];
      }
      else {
        result = match;
      }

      return result
    });
  }

  return function (data) {
    var result = replace.call(this, data).replace(/:\w+|\([^\)]+\)/g, ":");

    return RE_TEST.test(result)
      ? UNDEFINED
      : result.replace(RE_REPLACE, "");
  };
});
