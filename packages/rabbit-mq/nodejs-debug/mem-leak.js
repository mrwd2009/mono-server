const leaks = [];
function Leaking() {
  this.name = Math.random().toString(36);
  this.age = Math.floor(Math.random() * 100);
}

const list1 = [];
class List1 {
  name = 'list1';
}

for (let i = 0; i < 100; i++ ) {
  leaks.push(new Leaking());
  list1.push(new List1());
}

setInterval(() => {
  console.log(list1.length, leaks.length);
}, 1000);
console.log(`PID: ${process.pid}`);

// node src/mem-leak.js
// sudo gcore 3109
// lldb `which node` -c core-file