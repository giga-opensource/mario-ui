// var App = require('./../app/App.js');
// var React = require('react/addons');
// var TestUtils = React.addons.TestUtils;

// describe("App", function() {

//   it("should render text: Hello world!", function() {
//     var app = TestUtils.renderIntoDocument(React.createElement(App));
//     expect(React.findDOMNode(app).textContent).toEqual('Hello world!');
//   });

// });

var Utils = require('./../app/utils/utils');

describe("Utils", function() {

  it("should return desired array", function() {
    var origin = [1,2,3];
    var result = Utils.map(origin, function(item){ item * 2});
    expect(result).toEqual([2,4,6]);
  });

});
