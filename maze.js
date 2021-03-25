class Maze {
  constructor(Size, CanvasSize) {
    this.Size = Size;
    this.BoxSize = CanvasSize / this.Size;
    this.Grid = [];
    this.Stack = [];
    for (let y = 0; y < this.Size; y++) {
      for (let x = 0; x < this.Size; x++) {
        this.Grid.push(new Cell(x, y));
      }
    }
    this.Current = this.Grid[0];
  }
}