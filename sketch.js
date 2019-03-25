"use strict";

var table;
var startArray = [];
var items = [];
var particles = [];
var rulerY;

function preload() {
  table = loadTable("1.csv", "csv", "header");
}

function setup() {
  var canvas1 = createCanvas(windowWidth, windowHeight);
  canvas1.parent("canvas-holder");
  rulerY = height / 2; // find the start time information

  console.log(table.rows[0].arr); // find the duration

  console.log(table.rows[0].arr[2] - table.rows[0].arr[1]); // create array {startYear, duration, text1}

  for (var i = 0; i < table.rows.length; i++) {
    var dump = {
      displayYear: table.rows[i].arr[1],
      startYear: parseFloat(table.rows[i].arr[1].split("/")[0]) + (table.rows[i].arr[1].split("/")[1] - 1) / 12,
      endYear: parseFloat(table.rows[i].arr[2].split("/")[0]) + (table.rows[i].arr[2].split("/")[1] - 1) / 12,
      duration: (parseFloat(table.rows[i].arr[2].split("/")[0]) + (table.rows[i].arr[2].split("/")[1] - 1) / 12) - (parseFloat(table.rows[i].arr[1].split("/")[0]) + (table.rows[i].arr[1].split("/")[1] - 1) / 12),
      text1: table.rows[i].arr[0],
      link: table.rows[i].arr[3]
    };
    items.push(dump);
    startArray.push(dump.startYear);
  } // calculate time scale
  console.log(startArray)

  var scl = Math.max.apply(Math, startArray) - Math.min.apply(Math, startArray);
  var min = Math.min.apply(Math, startArray); // add relative position
  console.log(min);
  items.forEach(function (obj) {
    obj.relaX = (obj.startYear - min) / scl;
    obj.relaDuration = obj.duration / scl;
    obj.round = Math.floor(map(obj.relaX, 0, 1, 0, 12));
    var dump = new Particle(obj.displayYear, obj.relaX, rulerY, obj.startYear, obj.endYear, obj.round, obj.text1, obj.relaDuration, obj.link);
    console.log(obj.link);
    particles.push(dump);
  }); // createDouzeDivision
}

function draw() {
  // background(255, 150);
  clear(); // 标尺
  strokeWeight(1);
  stroke(255, 50, 0, 100);
  line(mouseX, 0, mouseX, height);
  for (var i = 100; i < width - 100; i += Math.floor((width - 200) / 12)) {
    fill(0, 150);
    noStroke();
    text((Math.ceil(i / width * 12) + 10) % 12, i + 25, rulerY + 50);
    stroke(0, 100);
    strokeWeight(3);
    line(i, rulerY, i, rulerY + 20);
  }

  line(0, rulerY, width, rulerY);

  for (var _i = 0; _i < particles.length; _i++) {
    particles[_i].update(particles);

    particles[_i].display(rulerY);
  }
}
