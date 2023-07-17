const modules = {
  "/Users/vasu/my-bundler/fixture/index.js": function (exports, require) {
    const {
      default: squareArea
    } = require("/Users/vasu/my-bundler/fixture/square.js");
    const {
      default: circleArea
    } = require("/Users/vasu/my-bundler/fixture/circle.js");
    const {
      default: circleArea1
    } = require("/Users/vasu/my-bundler/fixture/circle.js");
    console.log('Area of square: ', squareArea(5));
    console.log('Area of circle', circleArea(5));
    console.log('Area of circle', circleArea1(5));
  }, "/Users/vasu/my-bundler/fixture/square.js": function (exports, require) {
    function area(side) {
      return side * side;
    }
    exports.default = area;
  }, "/Users/vasu/my-bundler/fixture/circle.js": function (exports, require) {
    const PI = 3.14;
    function area(radius) {
      return PI * radius * radius;
    }
    exports.default = area;
  }, "/Users/vasu/my-bundler/fixture/circle.js": function (exports, require) {
    const PI = 3.14;
    function area(radius) {
      return PI * radius * radius;
    }
    exports.default = area;
  },
};
const entry = "/Users/vasu/my-bundler/fixture/index.js";
function webpackStart({ modules, entry }) {
  const moduleCache = {};
  const require = moduleName => {
    // if in cache, return the cached version
    if (moduleCache[moduleName]) {
      console.log('cache return for module: ', { moduleName });
      return moduleCache[moduleName];
    }
    const exports = {};
    // this will prevent infinite "require" loop
    // from circular dependencies
    moduleCache[moduleName] = exports;

    // "require"-ing the module,
    // exported stuff will assigned to "exports"
    modules[moduleName](exports, require);
    return moduleCache[moduleName];
  };

  // start the program
  require(entry);
}
webpackStart({ modules, entry });
