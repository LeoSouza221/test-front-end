let counter = 0;

function increaseCounter() {
  counter += 1;
  document.getElementById("number").innerHTML = counter;
}

function decreaseCounter() {
  counter -= 1;
  document.getElementById("number").innerHTML = counter;
}