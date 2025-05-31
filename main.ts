const whiteScore = document.getElementById("whiteScore") as HTMLElement;
const blackScore = document.getElementById("blackScore") as HTMLElement;
const reversiBoad = document.getElementById("reversiBoard") as HTMLElement;
let squares = document.getElementsByClassName("square");
let squaresToFlip: string[] = [];
let isWhiteTurn = false;
let whiteCount = 2;
let blackCount = 2;
let noLegalMove = false;

const setupBoard = (): void => {
  // assign an ID to each square
  for (let i = 0; i < squares.length; i++) {
    let row = 8 - Math.floor(i / 8);
    let col = (i % 8) + 1;
    let id = (row * 10 + col).toString();
    squares[i].setAttribute("id", id);
    squares[i].addEventListener("click", onSquareClick);
  }

  // identify legal squares
  let legalSquares: string[] = getLegalSquares("black");
  highlightLegalSquares(legalSquares);
  whiteScore?.classList.add("active");
};

// get the legal squares array
const getLegalSquares = (pieceColor: string): string[] => {
  let legalSquares: string[] = [];

  // to find legal squares, it first loops through all the squares on the board and checks to see if they are occupied.
  for (let i = 0; i < squares.length; i++) {
    let row = 8 - Math.floor(i / 8);
    let col = (i % 8) + 1;
    let id = (row * 10 + col).toString();
    let square = document.getElementById(id);
    let isSquareLegal = false;

    // if it is occupied, go to the next loop
    if (isSquareOccupied(square) !== "blank") continue;

    // if it is not occupied, the function begins moving from the starting square in eight direnctions, checking for squares to flip.
    // if any squares are identified where their pieces can be flipped, then the starting square is considered to be legal and will be added to legalSquares array.
    let stopSquareContent: Color = moveToEighthRow(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToFirstRow(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToEighthColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToFirstColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToEighthRowEighthColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToEighthRowFirstColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToFirstRowEighthColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    stopSquareContent = moveToFirstRowFirstColumn(id, pieceColor);
    if (stopSquareContent !== "blank" && squaresToFlip.length > 0) {
      isSquareLegal = true;
    }
    squaresToFlip.length = 0;

    if (isSquareLegal) {
      legalSquares.push(id);
    }

    console.log("Legal squares:", legalSquares);
    console.log("Checking square:", id);
    console.log("Stop square content:", stopSquareContent);
  }

  return legalSquares;
};

type Color = "black" | "white" | "blank";

const isSquareOccupied = (square: HTMLElement | null): Color => {
  if (square?.querySelector(".piece")) {
    const color = square
      .querySelector(".piece")
      ?.getAttribute("color") as Color;
    return color;
  } else {
    return "blank";
  }
};

const moveToEighthRow = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  // the function begins at the starting square and moves towards the eighth row, checking squares along the way.
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  let squaresToFlipTemp: string[] = [];
  let currentRow = rowNumber;

  while (currentRow !== 8) {
    currentRow++;
    let currentSquareId = currentRow + column;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    // if it reaches a square with the same color, it returns the piece color and the squares from the temporary array are added to the squaresToFlip array, indicating that their pieces can be flipped.
    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    // if it reaches a square with the opposite color, the square's ID will be added to a temporary array.
    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToFirstRow = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  let squaresToFlipTemp: string[] = [];
  let currentRow = rowNumber;

  while (currentRow !== 1) {
    currentRow--;
    let currentSquareId = currentRow + column;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToEighthColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;

  while (currentColumn !== 8) {
    currentColumn++;
    let currentSquareId = row + currentColumn;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToFirstColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;

  while (currentColumn !== 1) {
    currentColumn--;
    let currentSquareId = row + currentColumn;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToFirstRowEighthColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;
  let currentRow = rowNumber;

  while (currentColumn != 8 && currentRow != 1) {
    currentColumn++;
    currentRow--;
    let currentSquareId = currentRow.toString() + currentColumn.toString();
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent == pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent == "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToFirstRowFirstColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;
  let currentRow = rowNumber;

  while (currentColumn != 1 && currentRow != 1) {
    currentColumn--;
    currentRow--;
    let currentSquareId = currentRow.toString() + currentColumn.toString();
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent == pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent == "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToEighthRowEighthColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;
  let currentRow = rowNumber;

  while (currentColumn != 8 && currentRow != 8) {
    currentColumn++;
    currentRow++;
    let currentSquareId = currentRow.toString() + currentColumn.toString();
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

const moveToEighthRowFirstColumn = (
  startingSquareId: string,
  pieceColor: string,
): Color => {
  const row = startingSquareId.charAt(0);
  const column = startingSquareId.charAt(1);
  const rowNumber = parseInt(row);
  const columnNumber = parseInt(column);
  let squaresToFlipTemp: string[] = [];
  let currentColumn = columnNumber;
  let currentRow = rowNumber;

  while (currentColumn != 1 && currentRow != 8) {
    currentColumn--;
    currentRow++;
    let currentSquareId = currentRow.toString() + currentColumn.toString();
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);

    if (squareContent === pieceColor) {
      squaresToFlip.push(...squaresToFlipTemp);
      return squareContent;
    }

    if (squareContent === "blank") return squareContent;

    squaresToFlipTemp.push(currentSquareId);
  }

  return "blank";
};

// highlight the legal squares
const highlightLegalSquares = (legalSquares: string[]): void => {
  // clear any highlighted squares from the previous turn
  clearLegalSquares();

  legalSquares.forEach((square) => {
    const squareElement = document.getElementById(square);
    squareElement?.classList.add("legal-square");
  });
};

const clearLegalSquares = (): void => {
  const legalSquares = document.querySelectorAll(".legal-square");
  for (const square of legalSquares) {
    square.classList.remove("legal-square");
  }
};

// implement a click event
const onSquareClick = (e: Event): void => {
  let clickedSquare = e.currentTarget as HTMLElement;
  let pieceColor: Color = isWhiteTurn ? "white" : "black";
  let piece = createPiece(pieceColor);
  let isSquareLegal = false;
  let availableSquares = getLegalSquares(pieceColor);

  if (!availableSquares.includes(clickedSquare.id)) return;

  isSquareLegal = true;
  clickedSquare.appendChild(piece);
  pieceColor === "white" ? whiteCount++ : blackCount++;
  checkAndFlip(clickedSquare.id, pieceColor);
  switchTurn();
  checkEndGame();

  // if it's the CPU's turn, trigger `cpuMove`
  if (isWhiteTurn) {
    setTimeout(cpuMove, 500);
  }
};

// create a piece of a specified color
const createPiece = (color: Color): HTMLElement => {
  let piece = document.createElement("div");
  piece.setAttribute("class", "piece");
  piece.setAttribute("color", color);
  let img = document.createElement("img");
  img.setAttribute("src", `${color}-disc.png`);
  piece.appendChild(img);
  return piece;
};

// flip the pieces in between
const checkAndFlip = (clickedSquareId: string, pieceColor: Color): void => {
  // fill squaresToFlip array
  moveToEighthColumn(clickedSquareId, pieceColor);
  moveToEighthRow(clickedSquareId, pieceColor);
  moveToEighthRowEighthColumn(clickedSquareId, pieceColor);
  moveToEighthRowFirstColumn(clickedSquareId, pieceColor);
  moveToFirstColumn(clickedSquareId, pieceColor);
  moveToFirstRow(clickedSquareId, pieceColor);
  moveToFirstRowEighthColumn(clickedSquareId, pieceColor);
  moveToFirstRowFirstColumn(clickedSquareId, pieceColor);

  // flip the target pieces
  reversePieces(pieceColor);
};

const reversePieces = (color: Color): void => {
  squaresToFlip.forEach((squareId) => {
    let square = document.getElementById(squareId);

    // remove the existing piece from the square
    while (square?.firstChild) {
      square.firstChild.remove();
    }

    // fill the target square with a piece of the opposite color
    let piece = createPiece(color);
    square?.appendChild(piece);

    // add a flipping animation
    piece.classList.add("flip");

    // update the scores
    color === "white"
      ? whiteCount++ && blackCount--
      : whiteCount-- && blackCount++;
    whiteScore.innerHTML = `White Score: ${whiteCount}`;
    blackScore.innerHTML = `Black Score: ${blackCount}`;
  });

  squaresToFlip.length = 0;
};

// switch player's turn
const switchTurn = (): void => {
  isWhiteTurn = !isWhiteTurn;
  whiteScore.classList.toggle("active", isWhiteTurn);
  blackScore.classList.toggle("active", !isWhiteTurn);

  // retrive and highlight the new legal squares
  let pieceColor = isWhiteTurn ? "white" : "black";
  let availableSquares = getLegalSquares(pieceColor);
  highlightLegalSquares(availableSquares);

  // if there are no legal moves left, it switches turns again.
  if (availableSquares.length === 0) {
    isWhiteTurn = !isWhiteTurn;
    whiteScore.classList.toggle("active", isWhiteTurn);
    blackScore.classList.toggle("active", !isWhiteTurn);
    pieceColor = isWhiteTurn ? "white" : "black";
    availableSquares = getLegalSquares(pieceColor);
    highlightLegalSquares(availableSquares);

    // if there are still no legal moves available, this means that there are no legal moves for eigher side, and the noLegalMove value is set to true.
    if (availableSquares.length === 0) noLegalMove = true;
  }
};

// check for the end of the game
const checkEndGame = (): void => {
  let message = "";
  if (
    !(
      whiteCount + blackCount === 64 ||
      whiteCount === 0 ||
      blackCount === 0 ||
      noLegalMove
    )
  )
    return;

  if (whiteCount > blackCount) message = "White Wins!";
  if (whiteCount < blackCount) message = "Black Wins!";
  if (whiteCount === blackCount) message = "Draw!";
  showEndGameMessage(message);
};

const showEndGameMessage = (message: string): void => {
  const alert = document.getElementById("alert") as HTMLElement;
  alert.style.display = "block";
  reversiBoad.style.opacity = "0.5";
  alert.innerHTML = message;

  setTimeout(() => {
    alert.style.display = "none";
    reversiBoad.style.opacity = "1";
    resetGame();
  }, 4000);
};

// reset the game
const resetGame = (): void => {
  // Clear all squares
  Array.from(squares).forEach((square) => {
    square.innerHTML = ""; // Remove any pieces
    square.classList.remove("legal-square"); // Clear highlights
  });

  // Reset starting position
  document.getElementById("44")?.appendChild(createPiece("black"));
  document.getElementById("55")?.appendChild(createPiece("black"));
  document.getElementById("45")?.appendChild(createPiece("white"));
  document.getElementById("54")?.appendChild(createPiece("white"));

  // Reset scores
  whiteCount = 2;
  blackCount = 2;
  whiteScore.innerHTML = `White Score: ${whiteCount}`;
  blackScore.innerHTML = `Black Score: ${blackCount}`;

  // Reset turn
  isWhiteTurn = false;
  blackScore?.classList.add("active");
  whiteScore?.classList.remove("active");

  // Recalculate legal moves for first turn
  noLegalMove = false;
  let legalSquares = getLegalSquares("black");
  highlightLegalSquares(legalSquares);
};

document.getElementById("resetButton")?.addEventListener("click", resetGame);

// implement CPU
const cpuMove = (): void => {
  let cpuColor: Color = isWhiteTurn ? "white" : "black";
  let legalMoves = getLegalSquares(cpuColor);

  if (legalMoves.length === 0) {
    switchTurn();
    return;
  }

  // Select best move
  let chosenMove = pickBestMove(legalMoves, cpuColor);
  let targetSquare = document.getElementById(chosenMove);

  // Simulate the move
  if (targetSquare) {
    targetSquare.click();
  }
};

// find the move that flips the most pieces
const pickBestMove = (legalMoves: string[], pieceColor: Color): string => {
  let bestMove = "";
  let maxFlips = 0;

  legalMoves.forEach((move) => {
    let flipped: string[] = getFlippedPieces(move, pieceColor);
    if (flipped.length > maxFlips) {
      maxFlips = flipped.length;
      bestMove = move;
    }
  });

  return bestMove;
};

// Count how many pieces would flip
const getFlippedPieces = (
  startingSquareId: string,
  pieceColor: Color,
): string[] => {
  let flippedPieces: string[] = [];

  // Define all 8 directions (rowOffset, colOffset)
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Down-Right
    [1, -1], // Down-Left
    [-1, 1], // Up-Right
    [-1, -1], // Up-Left
  ];

  directions.forEach(([rowOffset, colOffset]) => {
    let tempFlipped: string[] = [];
    let [row, col] = startingSquareId.split("").map(Number);

    while (true) {
      //it will keep running indefinitely unless there's a break statement inside the loop to exit.
      row += rowOffset;
      col += colOffset;
      let currentSquareId = row.toString() + col.toString();
      let currentSquare = document.getElementById(currentSquareId);

      if (!currentSquare) break; // Out of bounds

      let squareContent = isSquareOccupied(currentSquare);

      if (squareContent === "blank") break; // Empty square, not valid
      if (squareContent === pieceColor) {
        flippedPieces.push(...tempFlipped); // Valid flip sequence
        break;
      }

      tempFlipped.push(currentSquareId); // Store potential flips
    }
  });

  return flippedPieces;
};

setupBoard();
