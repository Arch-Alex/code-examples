// //getting the default board to generate a 10 x 10 with 10 mines
let rows = Number(document.getElementById("rowsDefault").value);
let cols = Number(document.getElementById("colsDefault").value);
let mines = Number(document.getElementById("minesDefault").value);

//click event init
document.getElementById("button").addEventListener("click", () => {
  rows = Number(document.getElementById("rowsDefault").value);
  cols = Number(document.getElementById("colsDefault").value);
  mines = Number(document.getElementById("minesDefault").value);

  //generating the board only if the parameters are valid
  if (cols * rows > mines && cols > 0 && rows > 0 && mines > 0) {
    // redefining the CSS rows/cols based on user input
    board.style.setProperty(
      "--rowCSS",
      Number(document.getElementById("rowsDefault").value)
    );
    board.style.setProperty(
      "--colCSS",
      Number(document.getElementById("colsDefault").value)
    );

    document.getElementById("error").innerText = "";
    createBoard(cols, rows, mines);
  } else {
    document.getElementById("error").innerText =
      "Invalid input. Make sure there is plenty of space for the mines :)";
    elementBoard = [];
  }
});

//asigning CSS variables
board.style.setProperty(
  "--rowCSS",
  Number(document.getElementById("rowsDefault").value)
);
board.style.setProperty(
  "--colCSS",
  Number(document.getElementById("colsDefault").value)
);

//generating the board with random mines on it
function createBoard(cols, rows, mines) {
  let finalBoard = [];
  let elementBoard = [];
  const board = document.querySelector("#board");
  //clearing the board for each press of 'Generate board'
  board.innerHTML = "";
  //populating the array with 'mine' & 'clear' and then shuffling the array
  const minesArr = Array(mines).fill("mine");
  const clearArr = Array(rows * cols - mines).fill("clear");

  const boardArr = clearArr.concat(minesArr);
  const mixArr = boardArr.sort(() => Math.random() - 0.5);

  //turning the array into a matrix to better access 'coordonates'
  for (let i = 0; i < rows; i++) {
    finalBoard.push(mixArr.slice(cols * i, cols * (i + 1)));
  }

  // checking if the neighbours of a certain tile contain any mines so that we may update the adjecent mine count
  // coordinates of the neighbours in relation to the chosen element:
  // [x-1,y-1]      [x-1,y]          [x+1,y+1]
  // [x,y-1]         [x,y]            [x,y+1]
  // [x+1,y-1]      [x+1,y]          [x+1,y+1]

  for (let r = 0; r < rows; r++) {
    // splitting the check in rows and then collumns because of the possibility of out of bound neighbours

    const neighborRows = [finalBoard[r - 1], finalBoard[r], finalBoard[r + 1]];
    for (let c = 0; c < cols; c++) {
      // itterating through the 3 collumns , ignoring that particular column if the row is out of bounds and pushing the result in an array. (some results are undefined but it doesn't break our code)
      const neighbours = [];

      for (i = 0; i < 3; i++) {
        if (neighborRows[i]) {
          //placing all the neighbours in the 'neighbours' array , some are undefined, but the mines remain which are countable.
          neighbours.push(
            neighborRows[i][c - 1],
            neighborRows[i][c],
            neighborRows[i][c + 1]
          );
        }
      }

      //calculating the ammount of mines around each non-mine tile

      if (finalBoard[r][c] !== "mine") {
        finalBoard[r][c] = neighbours.filter((el) => el === "mine").length;
      }
    }
  }

  //adding either the .clear or .mine class to each piece and colouring the mines
  for (let i = 0; i < rows * cols; i++) {
    const boardElement = document.createElement("section");
    boardElement.setAttribute("id", i);
    boardElement.classList.add(mixArr[i]);
    board.appendChild(boardElement);
    elementBoard.push(boardElement);
  }

  //convering the matrix intro a flat array so that we may itterate over each element
  finalBoard = [].concat(...finalBoard);

  //adding the innerHTML/innerText for each tile. finalBoard contains a flat array of the numbers & mines, elementBoard contains an similar array but of the html elements .
  //both arrays have an identical number of elements and 'share' indexes

  elementBoard.forEach((tile, i) => {
    if (tile.classList.contains("mine")) {
      tile.innerHTML = "&#128163";
    } else {
      tile.innerText = finalBoard[i] ? finalBoard[i] : "";
    }
  });
}

//creating a standard 10 x 10 board with 10 mines
createBoard(10, 10, 10);
