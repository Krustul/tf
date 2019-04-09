"use strict";

function Particle(displayYear, relx, starty, syear, eyear, stagex, _text, dur, _link) {
  var colors = [
    // FENSE
    // [181, 232, 247, 255],
    // [184, 235, 214, 255],
    // [255, 232, 247, 255],
    // [217, 194, 240, 255]
    [75, 180, 230, 255],
    [80, 190, 135, 255],
    [255, 180, 230, 255],
    [168, 133, 216, 255]
  ];
  var _this = this;
  this.colorNo = Math.floor(random(0, 4));
  this.larg = constrain(dur * (width - 200), 0, 1000);
  this.largD = 30;
  this.absx = map(relx, 0, 1, 100, width - 100);
  this.absx1 = map(relx + dur, 0, 1, 100, width - 100);
  this.year = syear;
  this.displayYear = displayYear;
  this.select = false;
  this.endyear = eyear;
  this.x = stagex * width / 12;
  this.y = random() > 0.5 ? starty - 60 : starty + 30;
  // this.y = starty + random(-0.5, 1) * this.year / 100;
  this.move = false;
  this.txt = _text.split(" ").slice(0, 2).join("\n") + "\n" + this.displayYear;
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
      }
    } else {
      _this.select = false;
      _this.move = false;
    }

    // for (var i = 0; i < particles.length; i++) {
    //   if (_this.x === particles[i].x && _this !== particles[i]) {
    //     var distance = constrain(abs(_this.y - particles[i].y), 1, 10000);
    //     // distance / seleted / boudaries
    //     if (distance < 60 && !_this.select && !(_this.y > height - 10 || _this.y < 10)) {
    //       _this.y = _this.y - (particles[i].y - _this.y) * 5 / distance;
    //     } else if (distance > 1000) {
    //       _this.y = _this.y + (particles[i].y - _this.y) * 0.2;
    //     } else if (abs(_this.y - (height / 2 - 20)) < 40) {
    //       if (_this.y - height / 2 < 0) {
    //         _this.y = _this.y + (height / 2 - 60 - _this.y) * 0.5;
    //       } else {
    //         _this.y = _this.y + (height / 2 + 60 - _this.y) * 0.5;
    //       }
    //     }
    //   }
    // }
    for (var i = 0; i < particles.length; i++) {
      if (_this.x === particles[i].x && _this !== particles[i]) {
        var distance = constrain(abs(_this.y - particles[i].y), 0, 10000);
        distance === 0 ? (_this.y < height / 2 ? _this.y -= 2 : _this.y += 2) : "";
        if ((_this.y !== height / 2 - 60) && _this.y < height / 2) {
          if (distance < 60 && !(_this.y > height - 10 || _this.y < 10)) {
            if (particles[i].y > _this.y + 0.1) {
              _this.y = _this.y - (particles[i].y - _this.y) * 0.2;
            }
          }
        } else if ((_this.y !== height / 2 + 30) && _this.y > height / 2) {
          if ((distance < 60) && !(_this.y > height - 10 || _this.y < 10)) {
            if (particles[i].y < _this.y - 0.1) {
              _this.y = _this.y - (particles[i].y - _this.y) * 0.2;
            }
          }
        }


      }
    }
  };

  this.display = function (hei) {
    push();
    // colorMode(HSL, 255);
    noStroke();
    // var c = color(50 + _this.absx / width * 255, _this.select ? 200 : 150, _this.select ? 200 : 100, _this.select ? 230 : 50 + _this.larg / width * 100);
    var c = colors[_this.colorNo];
    fill(c);
    if (!_this.select) {
      _this.largD = constrain(_this.larg, 0, 100);
    } else {
      _this.largD = _this.largD + (_this.larg - _this.largD) * 0.1;
    }
    rect(_this.absx, _this.y, _this.largD, _this.select ? 60 : 40);
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