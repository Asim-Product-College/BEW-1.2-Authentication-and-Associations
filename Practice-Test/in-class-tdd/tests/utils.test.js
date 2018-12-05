const mocha = require("mocha");
const chai = require("chai");
const utils = require("../utils");
const expect = chai.expect;

// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
it("should say hello", function() {
  const hello = utils.sayHello();
  expect(hello).to.be.a("string");
  expect(hello).to.equal("Hello");
  expect(hello).with.lengthOf(5);
});

it("should return the area of a 5 by 6 rectangle", function() {
  // call area function
  const area = utils.area(5,6);
  expect(area).to.be.a("number");
  expect(area).to.equal(30);
  // check that it returns 30
});

it("should return the area of a circle of radius 5", function() {
  const r = 5; //'r' is short for radius.
  const area = utils.circleArea(r);
  expect(area).to.be.a("number");
  expect(area).to.equal(Math.PI * r * r);
});

// ========================================================
// Challenges
// ========================================================

// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.

it("Should create a new (object) Item with name and price", function() {
  const item = newItem();
});

it("Should return an array containing all items in cart");

it("Should add a new item to the shopping cart");

it("Should return the number of items in the cart");

it("Should remove items from cart");

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart");

it("Should remove an item when count is 0");

it("Should return the total cost of all items in the cart");