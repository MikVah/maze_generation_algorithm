// Made with tutorial created by "The Coding Train" on Youtube
// 

var cols, rows;
var w = 40;
var grid = [];

var current;
var stack = [];

  // Creates new canvas
  // Creates a grid upon the canvas

function setup() {
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(5); 
  
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

  // 

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  // Mark the current cell as visited and visually highlight the active cell
  
  current.visited = true;
  current.highlight();
    
    // STEP 1: Check the neighboring cell to see if it has been visited
    var next = current.checkNextCell();
    if (next) {
     next.visited = true;
    
    // STEP 2: Add the cell to the stack for callback
    stack.push(current);
    
    // STEP 3: Remove the correct cell walls
    removeWalls(current, next);
    
    // STEP 4: Move to the next available cell
     current = next;
    
 } else if (stack.length > 0) {
   current = stack.pop();
  
 }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 ||j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.checkNextCell = function() {
    var neighbors = [];
    
    var top = grid[index(i, j-1)];
    var right = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left = grid[index(i-1, j)];
    
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(241, 190, 0, 100);
    rect(x, y, w, w);
    
  }
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    
    if (this.walls[0]) {
      line(x,y,x+w,y);
    }
    if (this.walls[1]) {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      line(x+w,y+w,x,y+w);
    }  
    if (this.walls[3]) {
      line(x,y+w,x,y);
    }
    
    if (this.visited) {
      noStroke();
      fill(0, 204, 241, 100);
      rect(x,y,w,w);
    }
  }
}

function removeWalls(a, b ) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
