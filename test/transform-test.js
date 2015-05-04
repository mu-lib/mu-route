define([
  "buster",
  "../transform"
], function (buster, transform) {
  "use strict";

  var assert = buster.referee.assert;

  buster.testCase("mu-route/transform", {
    "=>/blog/:id?/:search/(page/:page)?": function () {
      assert.equals(transform.call("/blog/:id?/:search/(page/:page)?").source, "\\/blog\\/(?:(\\w+)?\\/(?:(\\w+)\\/(?:page\\/(?:(\\w+))?)))");
    }
  });
});
