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
      startYear: table.rows[i].arr[1],
      endYear: table.rows[i].arr[2],
      duration: table.rows[i].arr[2] - table.rows[i].arr[1],
      text1: table.rows[i].arr[0]
    };
    items.push(dump);
    startArray.push(table.rows[i].arr[1]);
  } // calculate time scale


  var scl = Math.max.apply(Math, startArray) - Math.min.apply(Math, startArray);
  var min = Math.min.apply(Math, startArray); // add relative position

  items.forEach(function (obj) {
    obj.relaX = (obj.startYear - min) / scl;
    obj.relaDuration = obj.duration / scl;
    obj.round = Math.floor(map(obj.relaX, 0, 1, 0, 12));
    var dump = new Particle(obj.relaX, rulerY, obj.startYear, obj.endYear, obj.round, obj.text1, obj.relaDuration);
    particles.push(dump);
  }); // createDouzeDivision
}

function draw() {
  // background(255, 150);
  clear(); // 标尺

  for (var i = 100; i < width - 100; i += Math.floor((width - 200) / 12)) {
    fill(0, 150);
    noStroke();
    text(Math.ceil(i / width * 12), i + 25, rulerY + 50);
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
