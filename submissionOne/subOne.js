// clearDiv() - checks the selected div for child nodes and removes them.
//              the div is then ready to be repopulated with new data
function clearNode(target) {
  var targetNode = document.getElementById(target);
  while(targetNode.hasChildNodes()) {
    targetNode.removeChild(targetNode.firstChild);
  }
}

// demoOne(x, y, target) - accepts 3 parameters, numbers x and y and the name
//                         of a div (target) where the result will be placed.
//                         function will display multiplation tables of number
//                         x up to number y times.
function demoOne(x, y, target) {
  clearNode(target);
  var result = "";
  var newNode = "";
  var newText = "";
  var destination = "";
  for (var i = 0; i <= y; i++) {
    result = x + " x " + i + " = " + x*i;
    newNode = document.createElement("p");
    newText = document.createTextNode(result);
    newNode.appendChild(newText);
    destination = document.getElementById(target);
    destination.appendChild(newNode);
  }
}
