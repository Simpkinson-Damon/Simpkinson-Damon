function saveUserInput() {
  let userNums = document.getElementById("nums").value;
  sessionStorage.setItem("savedNums", userNums);
}

function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
  ctx.restore();
}

let Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
    let maxValue = 0;
    for (item in this.options.data){
      maxValue = Math.max(maxValue,this.options.data[item]);
    }
    let canvasActualHeight = this.canvas.height - this.options.padding * 2;
    let canvasActualWidth = this.canvas.width - this.options.padding * 2;

    //drawing the grid lines
    let gridValue = 0;
    while (gridValue <= maxValue){
      let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );
      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline="bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 10,gridY - 2);
      this.ctx.restore();
      gridValue+=this.options.gridScale;
    }

    //drawing the bars
    let barIndex = 0;
    let numberOfBars = Object.keys(this.options.data).length;
    let barSize = (canvasActualWidth)/numberOfBars;
    for (item in this.options.data){
      let val = this.options.data[item];
      let barHeight = Math.round( canvasActualHeight * val/maxValue) ;
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex%this.colors.length]
      );
      barIndex++;
    }

    //drawing series name
    this.ctx.save();
    this.ctx.textBaseline="bottom";
    this.ctx.textAlign="center";
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "bold 14px Arial";
    this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
    this.ctx.restore();


    //draw legend
    barIndex = 0;
    let legend = document.querySelector("legend[for='chart']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (item in this.options.data){
      let li = document.createElement("li");
      li.style.align = "center";
      li.style.listStyle = "none";
      li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
      li.style.padding = "5px";
      li.textContent = "number: " + item;
      ul.append(li);
      barIndex++;
    }
  }
}

function generateRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = "rgb(" + r + "," + g + "," + b + ")";
  return color;
}

function generateBarChart() {
  let userNums = sessionStorage.getItem("savedNums");
  let nums = userNums.split(",");
  let chartCanvas = document.getElementById("chart");
  chartCanvas.width = 500;
  chartCanvas.height = 500;
  let colors = [];
  for (let i = 0; i < nums.length; i++){
    colors.push(generateRandomColor());
  }

  let myChart = new Barchart(
    {
      canvas:chartCanvas,
      seriesName:"User Numbers",
      padding:20,
      gridScale:10,
      gridColor:"#aaaaaa",
      data:nums,
      colors:colors
    }
  );
  console.log(nums);
  myChart.draw();
}

