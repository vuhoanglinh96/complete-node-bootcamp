const fs = require("fs");

setTimeout(function(){console.log("Timeout");}, 0);
setImmediate(function(){console.log("Immediate")});

fs.readFile("test-file.txt", () => {
  setTimeout(() => {
    console.log("Timer 2 finished")}
  );
  setTimeout(() => console.log("Timer 3 finished"), 100);
  setImmediate(() => console.log("Immediate 2 finished"));
})
