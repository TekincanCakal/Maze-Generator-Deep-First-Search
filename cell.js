class Cell{
    constructor(x,y){
      this.X = x;
      this.Y = y;
      this.Walls = [true, true, true, true];
      this.Visited = false;
    }
    checkNeighbors(grid, size)
    {
      var neighbors = [];
      var Top = grid[index(this.X, this.Y - 1, size)];
      var Right = grid[index(this.X + 1, this.Y, size)];
      var Bottom = grid[index(this.X, this.Y + 1, size)];
      var Left = grid[index(this.X - 1, this.Y, size)];
      if (Top && !Top.Visited) {
        neighbors.push(Top);
      }
      if (Right && !Right.Visited) {
        neighbors.push(Right);
      }
      if (Bottom && !Bottom.Visited) {
        neighbors.push(Bottom);
      }
      if (Left && !Left.Visited) {
        neighbors.push(Left);
      }
      if (neighbors.length > 0) {
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    }
    highlight(w){
      let x = this.X * w;
      let y = this.Y * w;
      noStroke();
      fill(0, 255, 0, 150);
      rect(x, y, w, w);
    }
    show(w){
      let x = this.X * w;
      let y = this.Y * w;
      stroke(255);
      if (this.Walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.Walls[1]) {
        line(x + w, y, x + w, y + w);
      }
      if (this.Walls[2]) {
        line(x + w, y + w, x, y + w);
      }
      if (this.Walls[3]) {
        line(x, y + w, x, y);
      }
      if (this.Visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
    }
  }