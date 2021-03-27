var MazeGame;
var CanvasSize = 1028.0;
var Timer = [0, 0, 0];

var Slider;
var SliderText;
var Start;
var TimerText;
var MapSize;
var MapCreateButton;
var StartButton;
var SaveButton;
function setup() {
    createCanvas(CanvasSize, CanvasSize);
    Start = false;
    Slider = document.getElementById("frameRateSlider");
    SliderText = document.getElementById("frameRateSliderText");
    TimerText = document.getElementById("timerText");
    MapSize = document.getElementById("mapSize");
    StartButton = document.getElementById("startButton");
    SaveButton = document.getElementById("saveButton");
    MapCreateButton = document.getElementById("mapCreateButton");
    SliderText.innerHTML = "FrameRate: " + this.Slider.value
    Slider.oninput = function () {
        SliderText.innerHTML = "FrameRate: " + this.value;
    }
}
function mapCreate() {
    MazeGame = new Maze(parseInt(MapSize.value), CanvasSize);
    Timer = [0, 0, 0];
    Start = false;
    StartButton.innerHTML = "Start";
    StartButton.disabled = false;
    SaveButton.disabled = true;
}
function saveMap(){
    let temp = JSON.stringify(this.MazeGame.Grid);
    downloadString(temp, "text/txt", "Map.txt");
}
function startStop() {
    Start = !Start;
    if (Start) {
        StartButton.innerHTML = "Stop"
        MapCreateButton.disabled = true;
    }
    else {
        StartButton.innerHTML = "Start";
        MapCreateButton.disabled = false;
    }
}
function draw() {
    frameRate(parseInt(Slider.value));
    background(51);
    if(this.MazeGame){
        this.MazeGame.Grid.forEach(cell => {
            cell.show(this.MazeGame.BoxSize);
        })
        if (Start) {
        if (frameCount % 60 == 0) {
            Timer[0]++;
            if (Timer[0] == 60) {
                Timer[0] = 0;
                Timer[1]++;
            }
            if (Timer[1] == 60) {
                Timer[1] = 0;
                Timer[2]++;
            }
            let temp = "Time Eleapsed: ";
            if (Timer[2] <= 9) {
                temp = temp.concat("0" + Timer[2] + ":");
            }
            else {
                temp = temp.concat(Timer[2] + ":");
            }
            if (Timer[1] <= 9) {
                temp = temp.concat("0" + Timer[1] + ":");
            }
            else {
                temp = temp.concat(Timer[1] + ":");
            }
            if (Timer[0] <= 9) {
                temp = temp.concat("0" + Timer[0]);
            }
            else {
                temp = temp.concat(Timer[0]);
            }
            TimerText.innerHTML = temp;
        }
        this.MazeGame.Current.Visited = true;
        this.MazeGame.Current.highlight(this.MazeGame.BoxSize);
        var next = this.MazeGame.Current.checkNeighbors(this.MazeGame.Grid, this.MazeGame.Size);
        if (next) {
            next.Visited = true;
            this.MazeGame.Stack.push(this.MazeGame.Current);
            removeWalls(this.MazeGame.Current, next);
            this.MazeGame.Current = next;
        }
        else if (this.MazeGame.Stack.length > 0) {
            this.MazeGame.Current = this.MazeGame.Stack.pop();
        }
        if(!next && this.MazeGame.Stack.length == 0){
            Start = false;
            MapCreateButton.disabled = false;
            StartButton.disabled = true;
            SaveButton.disabled = false;
            this.MazeGame.Grid.forEach(cell => {
                cell.Visited = false;
            })
        }
    }
    }
}

function index(x, y, size) {
    if (x < 0 || y < 0 || x > size - 1 || y > size - 1) {
        return -1;
    }
    return x + y * size;
}
function removeWalls(current, next) {
    let x = current.X - next.X;
    if (x === 1) {
        current.Walls[3] = false;
        next.Walls[1] = false;
    } else if (x === -1) {
        current.Walls[1] = false;
        next.Walls[3] = false;
    }
    let y = current.Y - next.Y;
    if (y === 1) {
        current.Walls[0] = false;
        next.Walls[2] = false;
    } else if (y === -1) {
        current.Walls[2] = false;
        next.Walls[0] = false;
    }
}
function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });
  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}
