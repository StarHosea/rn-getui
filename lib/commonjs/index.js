"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getui = require("./getui");
Object.keys(_getui).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getui[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getui[key];
    }
  });
});
//# sourceMappingURL=index.js.map