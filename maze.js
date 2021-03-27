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
              this.Grid.push({Location: {X: x, Y: y}, Walls: [true, true, true, true], Visited: false});
          }
      }
      this.CurrentCell = this.Grid[0];
    }
    index(point) 
    {
        if (point.X < 0 || point.Y < 0 || point.X > this.Size - 1 || point.Y > this.Size - 1) 
        {
            return -1;
        }
        return point.X + (point.Y * this.Size);
    }
    showCell(cell)
    {
        let x = cell.Location.X * this.BoxSize;
        let y = cell.Location.Y * this.BoxSize;
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
        let x = this.CurrentCell.Location.X * this.BoxSize;
        let y = this.CurrentCell.Location.Y * this.BoxSize;
        noStroke();
        fill(0, 255, 0, 150);
        rect(x, y, this.BoxSize, this.BoxSize);
    }
    checkNeighbors(cell)
    {
        var neighbors = [];
        var Top = this.Grid[this.index({X: cell.Location.X, Y: cell.Location.Y - 1})];
        var Right = this.Grid[this.index({X: cell.Location.X + 1, Y: cell.Location.Y})];
        var Bottom = this.Grid[this.index({X: cell.Location.X, Y: cell.Location.Y + 1})];
        var Left = this.Grid[this.index({X: cell.Location.X - 1, Y: cell.Location.Y})];
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
        let x = this.CurrentCell.Location.X - next.Location.X;
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
        let y = this.CurrentCell.Location.Y - next.Location.Y;
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