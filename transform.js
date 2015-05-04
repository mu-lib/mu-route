define([], function () {
  "use strict";

  var LENGTH = "length";

  return function () {
    var patterns = [];
    var tokens = [];

    patterns[0] = this.replace(/\([^\)]+\)\??/g, function (pattern) {
      var index = patterns[LENGTH] + 1;

      patterns[index] = pattern;

      return "$" + index;
    });

    patterns = patterns.map(function (pattern) {
      var result = pattern.replace(/\(/g, "\0");
      var previous;

      do {
        result = (previous = result).replace(/:(\w+)(\??)(.*)/, function (match, token, optional, tail) {
          tokens[tokens[LENGTH]] = token;

          return "(?:(\\w+)" + optional + tail + ")";
        });
      }
      while (result !== previous);

      return result.replace(/\0/g, "(?:");
    });

    var regexp = new RegExp(patterns[0].replace(/\$(\d+)/g, function (match, index) {
      return patterns[parseInt(index)] || match;
    }));

    regexp.tokens = tokens;
    regexp.pattern = this;

    return regexp;
  };
});
