const sayHello = () => {
    return "Hello";
  };
  
  const area = (w, h) => {
    return w * h;
  };
  // => they don't act as objects - you can't bind scopes to them, context things they manage differently, easier to write anon functions.
  
  const perimeter = (w, h) => {
    return w + w + h + h;
  };
  // when u have 1 argument u don't need to include ()
  const circleArea = r => {
    return Math.PI * r * r;
  };
  
  module.exports = { sayHello, area, perimeter, circleArea };