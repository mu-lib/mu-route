define([ "./transform" ], function (transform) {
  "use strict";

  return function (data) {
    var result = {};
    var matches;
    var length;

    if ((matches = new RegExp(transform.call(this)).exec(data)) !== null) {
    }

    console.log(matches);
  };
});
