define([
  "buster",
  "../parse"
], function (buster, parse) {
  "use strict";

  var assert = buster.referee.assert;
  var refute = buster.referee.refute;

  buster.testCase("mu-route/parse", {
    "/blog/:id?/:search/(page/:page)?": function () {
      var pattern = "/blog/:id?/:search/(page/:page)?";

      assert.equals(parse.call(pattern, "/blog/123/xyz/page/321"), {
        "id": "123",
        "search": "xyz",
        "page": "321"
      });

      assert.equals(parse.call(pattern, "/blog/123/xyz/"), {
        "id": "123",
        "search": "xyz"
      });

      refute.defined(parse.call(pattern, "/blog/123/"));
    }
  });
});
