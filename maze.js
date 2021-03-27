class Maze 
{
  constructor(Size, CanvasSize) 
  {
    this.Size = Size;
    this.BoxSize = CanvasSize / this.Size;
    this.Grid = [];
    this.Stack = [];
    for (let y = 0; y < this.Size; y++) 
    {
      for (let x = 0; x < this.Size; x++) 
      {
        this.Grid.push({X: x, Y: y, Walls: [true, true, true, true], Visited: false});
      }
    }
    this.CurrentCell = this.Grid[0];
  }
  index(x, y) 
  {
    if (x < 0 || y < 0 || x > this.Size - 1 || y > this.Size - 1) 
    {
        return -1;
    }
    return x + (y* this.Size);
  }
  showCell(cell)
  {
    let x = cell.X * this.BoxSize;
    let y = cell.Y * this.BoxSize;
    stroke(255);
    if (cell.Walls[0]) 
    {
      line(x, y, x + this.BoxSize, y);
    }
    if (cell.Walls[1]) 
    {
      line(x + this.BoxSize, y, x + this.BoxSize, y + this.BoxSize);
    }
    if (cell.Walls[2]) 
    {
      line(x + this.BoxSize, y + this.BoxSize, x, y + this.BoxSize);
    }
    if (cell.Walls[3]) 
    {
      line(x, y + this.BoxSize, x, y);
    }
    if (cell.Visited) 
    {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, this.BoxSize, this.BoxSize);
    }
  }
  showCurrentCell()
  {
    let x = this.CurrentCell.X * this.BoxSize;
    let y = this.CurrentCell.Y * this.BoxSize;
    noStroke();
    fill(0, 255, 0, 150);
    rect(x, y, this.BoxSize, this.BoxSize);
  }
  checkNeighbors(cell)
  {
    var neighbors = [];
    var Top = this.Grid[this.index(cell.X, cell.Y - 1)];
    var Right = this.Grid[this.index(cell.X + 1, cell.Y)];
    var Bottom = this.Grid[this.index(cell.X, cell.Y + 1)];
    var Left = this.Grid[this.index(cell.X - 1, cell.Y)];
    if (Top && !Top.Visited) 
    {
      neighbors.push(Top);
    }
    if (Right && !Right.Visited) 
    {
      neighbors.push(Right);
    }
    if (Bottom && !Bottom.Visited) 
    {
      neighbors.push(Bottom);
    }
    if (Left && !Left.Visited) 
    {
      neighbors.push(Left);
    }
    if (neighbors.length > 0) 
    {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } 
    else 
    {
      return undefined;
    }
  }
  removeWalls(next) 
  {
    let x = this.CurrentCell.X - next.X;
    if (x === 1) 
    {
      this.CurrentCell.Walls[3] = false;
      next.Walls[1] = false;
    } 
    else if (x === -1) 
    {
      this.CurrentCell.Walls[1] = false;
      next.Walls[3] = false;
    }
    let y = this.CurrentCell.Y - next.Y;
    if (y === 1) 
    {
      this.CurrentCell.Walls[0] = false;
      next.Walls[2] = false;
    } 
    else if (y === -1)
    {
      this.CurrentCell.Walls[2] = false;
      next.Walls[0] = false;
    }
  }
}