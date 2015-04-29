define([
  "buster",
  "../build"
], function (buster, build) {
  "use strict";

  var assert = buster.referee.assert;
  var refute = buster.referee.refute;

  buster.testCase("mu-route/build", {
    "/blog/:id?/:search/(page/:page)?": function () {
      var pattern = "/blog/:id?/:search/(page/:page)?";

      assert.equals(build.call(pattern, {
        "id": 123,
        "search": "xyz",
        "page": 321
      }), "/blog/123/xyz/page/321");

      assert.equals(build.call(pattern, {
        "id": 123,
        "search": "xyz"
      }), "/blog/123/xyz/");

      refute.defined(build.call(pattern, {
        "id": 123
      }));

      assert.equals(build.call(pattern, {
        "search": "xyz",
        "page": 321
      }), "/blog/");

      refute.defined(build.call(pattern, {
        "page": 321
      }));
    }
  });
});
