"use strict";

function Particle(displayYear, relx, starty, syear, eyear, stagex, _text, dur, _link) {
  var _this = this;
  this.larg = dur * (width - 200);
  this.absx = map(relx, 0, 1, 100, width - 100);
  this.absx1 = map(relx + dur, 0, 1, 100, width - 100);
  this.year = syear;
  this.displayYear = displayYear;
  this.select = false;
  this.endyear = eyear;
  this.x = stagex * width / 12;
  this.y = starty + random(0.5, 1) * this.year / 100;
  // if (Math.random() > 0.5) {
  //   this.y = starty + 40 + random(0.5, 1);
  // } else {
  //   this.y = starty - 40 - random(0.5, 1);
  // }


  // this.y = height / 2 + random(-50, 50);
  this.move = false;
  this.txt = _text.split(" ").slice(0, 2).join("\n") + " " + this.displayYear;
  this.link = _link;

  function touchEnded() {
    setTimeout(function () {
      window.open(_this.link);
    }, 1);
  }
  this.update = function (particles) {
    if (mouseY > _this.y - 20 && mouseY < _this.y + 30 && mouseX > _this.absx & mouseX < _this.absx + 100) {
      _this.select = true;
      for (var m = 0; m < particles.length; m++) {
        particles[m].select = false;
      }
      _this.select = true;

      if (mouseIsPressed) {
        touchEnded();
        // setTimeout(function () { _this.move = true }, 200);
        if ((mouseY < 0.8 * height && mouseY > 0.2 * height)) {
          // _this.move = true;
          // _this.y = _this.y + (mouseY - _this.y) * 0.05;
        }
      }
    } else {
      _this.select = false;
      _this.move = false;
    }

    for (var i = 0; i < particles.length; i++) {
      if (_this.x > particles[i].x - 2 && _this.x < particles[i].x + 1) {
        var distance = abs(_this.y - particles[i].y);
        if (distance < 60 && !_this.select && !(_this.y > height - 10 || _this.y < 10)) {
          _this.y = _this.y - (particles[i].y - _this.y) * 5 / (distance + 1);
        } else if (distance > 1000) {
          _this.y = _this.y + (particles[i].y - _this.y) * 0.2;
        } else if (abs(_this.y - height / 2) < 30) {
          if (_this.y - height / 2 < 0) {
            _this.y = _this.y + (height / 2 - 30 - _this.y) * 0.1;
          } else {
            _this.y = _this.y + (height / 2 + 30 - _this.y) * 0.1;
          }
        }
      }
    }
  };

  this.display = function (hei) {
    push();
    colorMode(HSL, 255);
    noStroke();
    var c = color(50 + _this.absx / width * 255, _this.select ? 200 : 150, _this.select ? 200 : 100, _this.select ? 230 : 50 + _this.larg / width * 100);
    fill(c);
    rect(_this.absx, _this.y, _this.larg, _this.select ? 60 : 30, 0, 120, 0, 0);
    textAlign(LEFT, TOP);
    textSize(_this.select ? 15 : 10);
    stroke([100, 100]);
    fill(0, _this.select ? 255 : 180);

    if (_this.select) {
      push();
      colorMode(RGB);
      stroke(255, 150, 40);
      line(_this.absx - 1.5, _this.y, _this.absx - 1.5, hei);
      line(_this.absx1 - 1.5, _this.y + 60, _this.absx1 - 1.5, hei);
      strokeWeight(10);
      line(_this.absx - 1.5, hei, _this.absx1 - 1.5, hei);
      pop();
    }

    noStroke();
    text(_this.txt, _this.absx, _this.y);
    pop();
  };
}