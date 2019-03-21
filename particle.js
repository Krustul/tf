function Particle(relx, starty, syear, eyear, stagex, _text, dur) {
  this.larg = dur * (width - 200);
  this.absx = map(relx, 0, 1, 100, width - 100);
  this.absx1 = map(relx + dur, 0, 1, 100, width - 100);

  this.year = syear;
  this.select = false;
  this.endyear = eyear;
  this.x = stagex * width / 12;
  this.y = starty + random(0.5, 1) * this.year / 100;
  this.txt = _text.split(" ").slice(0, 2).join("\n") + " " + this.year + "~" + this.endyear;
  this.update = (particles) => {
    if (((mouseY > this.y - 20) && (mouseY < this.y + 30) && (mouseX > this.absx) & (mouseX < this.absx + 100))) {
      this.y = this.y + (mouseY - this.y) * 0.3;
      this.select = true;
    } else {
      this.select = false;
    }
    for (let i = 0; i < particles.length; i++) {
      if ((this.x > particles[i].x - 2) && (this.x < particles[i].x + 1)) {
        let distance = abs(this.y - particles[i].y);
        if (distance < 75 && !this.select) {
          this.y = this.y - (particles[i].y - this.y) * 5 / (distance + 1);
        } else if (distance > 1000) {
          this.y = this.y + (particles[i].y - this.y) * 0.1;
        }
      }
    }
  }
  this.display = (hei) => {
    push();
    colorMode(HSL, 255);
    noStroke();
    let c = color(50 + this.absx / width * 255, this.select ? 255 : 150, 100, 50 + this.larg / width * 200);
    fill(c);
    rect(this.absx, this.y, this.larg, this.select ? 60 : 30, 0, 120, 0, 0);
    textAlign(LEFT, TOP);
    textSize(this.select ? 18 : 12);
    stroke([100, 100]);
    fill(0, this.select ? 255 : 180);
    if (this.select) {
      push();
      colorMode(RGB);
      stroke(255, 150, 40);
      line(this.absx - 1.5, this.y, this.absx - 1.5, hei);
      line(this.absx1 - 1.5, this.y + 60, this.absx1 - 1.5, hei);
      strokeWeight(10)
      line(this.absx - 1.5, hei, this.absx1 - 1.5, hei);
      pop();
    }
    noStroke();
    text(this.txt, this.absx, this.y);
    pop();
  }
}