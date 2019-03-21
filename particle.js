
"use strict";

function Particle(relx, starty, syear, eyear, stagex, _text, dur) {
  var _this = this;

  this.larg = dur * (width - 200);
  this.absx = map(relx, 0, 1, 100, width - 100);
  this.absx1 = map(relx + dur, 0, 1, 100, width - 100);
  this.year = syear;
  this.select = false;
  this.endyear = eyear;
  this.x = stagex * width / 12;
  this.y = starty + random(0.5, 1) * this.year / 100;
  this.txt = _text.split(" ").slice(0, 2).join("\n") + " " + this.year + "~" + this.endyear;

  this.update = function (particles) {
    if (mouseY > _this.y - 20 && mouseY < _this.y + 30 && mouseX > _this.absx & mouseX < _this.absx + 100) {
      _this.y = _this.y + (mouseY - _this.y) * 0.3;
      _this.select = true;
    } else {
      _this.select = false;
    }

    for (var i = 0; i < particles.length; i++) {
      if (_this.x > particles[i].x - 2 && _this.x < particles[i].x + 1) {
        var distance = abs(_this.y - particles[i].y);

        if (distance < 75 && !_this.select) {
          _this.y = _this.y - (particles[i].y - _this.y) * 5 / (distance + 1);
        } else if (distance > 1000) {
          _this.y = _this.y + (particles[i].y - _this.y) * 0.1;
        }
      }
    }
  };

  this.display = function (hei) {
    push();
    colorMode(HSL, 255);
    noStroke();
    var c = color(50 + _this.absx / width * 255, _this.select ? 255 : 150, 100, 50 + _this.larg / width * 200);
    fill(c);
    rect(_this.absx, _this.y, _this.larg, _this.select ? 60 : 30, 0, 120, 0, 0);
    textAlign(LEFT, TOP);
    textSize(_this.select ? 18 : 12);
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