// global variables
let boardArray, columns, rows, load, multiArray, aliveState, saved;
const res = 5;
let pressed = false;

function preload() {
    // loads JSON (if available)
    if (load != null) {
        load = loadJSON('js/game.json');
    }
}

function setup() {
    // size of the grid is made through resolution which can be changed at the top
    createCanvas(500, 500);
    columns = width / res;
    rows = height / res;
    // creates an array of the cells so that they can be used for calculations
    multiArray = createGrid(columns, rows);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            multiArray[i][j] = floor(random(2));
        }
    }
}

function draw() {
    // the draw loop is where the functions are constantly executed from the p5 library
    backboard(); // creates the board
    if (pressed) {
        boardChange();
    }
    if (!saved && !pressed) {
        saveData();
    }
    saved = true;
}

function backboard() {
    // sets the background and creates a board with the grid data
    background(10);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let column = i * res;
            let row = j * res;
            aliveState = multiArray[i][j];
            if (multiArray[i][j] == 1) {
                fill(208, 190, 244);
                rect(column, row, res - 1, res - 1);
            }
        }
    }
}

function boardChange() {
    /* This function will start the game of life, the board will 
    be created first with a state for each of the cells and then 
    the user can store the board data, before using the mousePressed
    function to start the animation.
    */
    let board = createGrid(columns, rows);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            aliveState = multiArray[i][j];
            let neighbours = neighbourTotal(multiArray, i, j);
            if (aliveState == 0 && neighbours == 3) {
                board[i][j] = 1;
            } else if (aliveState == 1 && (neighbours < 2 || neighbours > 3)) {
                board[i][j] = 0;
            } else {
                board[i][j] = aliveState;
            }
        }
    }
    mousePressed(); // functionality to start the animation
    multiArray = board;
}

function neighbourTotal(arrMult, gridX, gridY) {
    // this is where we count the states of the cells around each cell
    let sum = 0;
    let num = -1;
    for (let i = num; i < 2; i++) { // we need to be counting the cells around the cell
        for (let j = num; j < 2; j++) { // this is why the starting number is -1
            let column = (gridX + i + columns) % columns;
            let row = (gridY + j + rows) % rows;
            sum += arrMult[column][row];
        }
    }
    sum -= arrMult[gridX][gridY];
    return sum;
}

function saveData() {
    // this function saves the positions of the cells to a file
    for (const cells in multiArray) {
        console.log(cells);
    }
}


function mousePressed() {
    // mouse pressing to change a boolean value, reduces problems with startup
    if ((mouseButton == LEFT)) {
        // saves the cell data
        {
            pressed = true;
        }
    }
}

function createGrid(columns, rows) {
    // creates a two dimensional array where columns/rows are stored
    let boardArray = new Array(columns);
    let i = 0;
    while (i < boardArray.length) {
        boardArray[i] = new Array(rows);
        i++;
    }
    return boardArray;
}