let throttle = function(fn, value, time = 1000) {
  let prev = 0;

  let now = Date.now();
  console.log(now);
  if (now - prev > time) {
    console.log(fn, value);
    fn(value)
    prev = now;
  } else {
    return;
  }
};

export { throttle };
