"use strict";

var table;
var startArray = [];
var items = [];
var particles = [];
var rulerY;
var state = 0;
var months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
var colors = [ // [255, 210, 0, 100],
  [80, 190, 135, 255],
  [255, 180, 230, 255],
  [168, 133, 216, 255],
  [75, 180, 230, 255]
];

function preload() {
  table = loadTable("1.csv", "csv", "header");
}

function setup() {
  randomSeed(1358); // randomSeed(13259823982398);
  textStyle(BOLD);
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
      duration: parseFloat(table.rows[i].arr[2].split("/")[0]) + (table.rows[i].arr[2].split("/")[1] - 1) / 12 - (parseFloat(table.rows[i].arr[1].split("/")[0]) + (table.rows[i].arr[1].split("/")[1] - 1) / 12),
      text1: table.rows[i].arr[0],
      link: table.rows[i].arr[3]
    };
    items.push(dump);
    startArray.push(dump.startYear);
  } // calculate time scale


  console.log(startArray);
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
  // particles.push(particles.splice(particles.findIndex(v => v.larg < 100), 1)[0]);

  particles.sort(function (a, b) {
    return b.larg - a.larg;
  });
}

function draw() {
  strokeCap(PROJECT);
  textStyle(BOLD); // background(255, 150);

  clear(); // 标尺

  push();
  textSize(30);
  noStroke();
  fill(0);
  textAlign(CENTER);
  text("Nos Projets  2019", width / 2, height * 0.05 + 50);
  textSize(15);
  fill(89);
  text("Click sur un projet pour en savoir plus", width / 2, height * 0.05 + 50 + 30);
  pop();
  strokeWeight(1);
  stroke(255, 50, 0, 100);
  line(mouseX, 0, mouseX, height);

  for (var i = 0; i < 12; i += 1) {
    fill(0, 150);
    var tx = 100 + i * (width - 200) / 12; // console.log(months[i]);

    noStroke();
    fill(89);
    text(months[i], tx + 10, rulerY + 15);
    stroke(80);
    strokeWeight(3);
    line(tx, rulerY, tx, rulerY + 20);
  }

  line(0, rulerY, width, rulerY);

  for (var _i = 0; _i < particles.length; _i++) {
    particles[_i].update(particles);

    particles[_i].display(rulerY);
  }

  push();
  translate(-40, 0);
  noStroke();
  fill(colors[0]);
  rect(0.2 * width, 0.9 * height, 15, 15);
  fill(0);
  text('Relation Client', 0.2 * width + 30, 0.9 * height + 13);
  fill(colors[1]);
  rect(0.4 * width, 0.9 * height, 15, 15);
  fill(0);
  text('Digital Client', 0.4 * width + 30, 0.9 * height + 13);
  fill(colors[2]);
  rect(0.6 * width, 0.9 * height, 15, 15);
  fill(0);
  text('Expérience Client', 0.6 * width + 30, 0.9 * height + 13);
  fill(colors[3]);
  rect(0.8 * width, 0.9 * height, 15, 15);
  fill(0);
  text('Expérience Salarié', 0.8 * width + 30, 0.9 * height + 13);
  pop();
}

function touchEnded() {
  state = 1;
}

function touchStarted() {
  state = 0;
}