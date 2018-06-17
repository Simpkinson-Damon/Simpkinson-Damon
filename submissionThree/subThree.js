var mouseOverCount = 0;
var mouseRollCount = 0;
var mouseRollIDCounter = 0;
var imgWidth = 864;
var imgHeight = 574;
var cars = [];

function countMouseOver() {
  mouseOverCount++;
  document.getElementById("mouseOverCounter").innerHTML = mouseOverCount;
}

function countMouseMove() {
  mouseRollCount++;
  mouseRollIDCounter++;
  document.getElementById("mouseRollCounter").innerHTML = mouseRollCount;
  if(mouseRollIDCounter === 250){
    if(document.getElementById("mouseRollButtonOne")) {
      document.getElementById("mouseRollButtonOne").id = "mouseRollButtonTwo";
    } else if (document.getElementById("mouseRollButtonTwo")) {
      document.getElementById("mouseRollButtonTwo").id = "mouseRollButtonThree";
    } else {
      document.getElementById("mouseRollButtonThree").id = "mouseRollButtonOne";
    }
    mouseRollIDCounter = 0;
  }
}

function resetMouseCount() {
  mouseOverCount = 0;
  mouseRollCount = 0;
  document.getElementById("mouseOverCounter").innerHTML = mouseOverCount;
  document.getElementById("mouseRollCounter").innerHTML = mouseRollCount;
}

function increaseImgSize() {
  imgWidth = Math.floor(imgWidth * 1.1);
  imgHeight = Math.floor(imgHeight * 1.1);
  document.getElementById("balloons").style.width = imgWidth + "px";
  document.getElementById("balloons").style.height = imgHeight + "px";
}

function decreaseImgSize() {
  imgWidth = Math.floor(imgWidth * 0.9);
  imgHeight = Math.floor(imgHeight * 0.9);
  document.getElementById("balloons").style.width = imgWidth + "px";
  document.getElementById("balloons").style.height = imgHeight + "px";
}

function addCar() {
  let make = document.getElementById("carMake").value;
  let model = document.getElementById("carModel").value;
  let year = document.getElementById("carYear").value;
  let color = document.getElementById("carColor").value;
  let car = {"make":make, "model":model, "year":year, "color":color};
  cars.push(car);
  redrawCars();
  driveCar(color);
}

function delCar() {
  let carsTemp = [];
  for(let i = 0; i < cars.length; i++) {
    if(!document.getElementById([i]).checked){
      carsTemp.push(cars[i]);
    }
  }
  cars = carsTemp;
  console.log("deleted car");
  console.log(cars);
  redrawCars();
}

function redrawCars() {
  clearNode("carData");
  let carTableData = '<table align="center" cellpadding="10px"><tr><th>Make</th><th>Model</th><th>Year</th><th>Color</th><th>Remove Item</th></tr>';
  let carDelBoxID = "";
  for(let i = 0; i < cars.length; i++) {
    carDelBoxID = i;
    carTableData += '<tr><td>' + cars[i].make + '</td>';
    carTableData += '<td>' + cars[i].model + '</td>';
    carTableData += '<td>' + cars[i].year + '</td>';
    carTableData += '<td>' + cars[i].color + '</td>';
    carTableData += '<td><input type="checkbox" id="';
    carTableData += carDelBoxID;
    carTableData += '"></td></tr>';
  }
  carTableData += '</table>';
  $("#carData").append(carTableData);
  document.getElementById("carData").style.textAlign = "center";
}


function clearNode(target) {
  let targetNode = document.getElementById(target);
  while(targetNode.hasChildNodes()) {
    targetNode.removeChild(targetNode.firstChild);
  }
}

function driveCar(color) {
  let car = document.getElementById("raceCar");
  document.getElementById("raceCar").style.backgroundColor = color;
  let vPos = 15;
  let hPos = 0;
  let move = setInterval(movement, 3);
  function movement() {
    if (hPos < 2500) {
      hPos ++;
      car.style.left = hPos + 'px';
      car.style.top = vPos + 'px';
    } else {
      clearInterval(move);
      document.getElementById("raceCar").style.backgroundColor = "black";
    }
  }
}