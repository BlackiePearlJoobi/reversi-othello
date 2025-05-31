"use strict";
var _a;
const whiteScore = document.getElementById("whiteScore");
const blackScore = document.getElementById("blackScore");
const reversiBoad = document.getElementById("reversiBoard");
let squares = document.getElementsByClassName("square");
let squaresToFlip = [];
let isWhiteTurn = true;
let whiteCount = 2;
let blackCount = 2;
let noLegalMove = false;
const setupBoard = () => {
    // assign an ID to each square
    for (let i = 0; i < squares.length; i++) {
        let row = 8 - Math.floor(i / 8);
        let col = (i % 8) + 1;
        let id = (row * 10 + col).toString();
        squares[i].setAttribute("id", id);
        squares[i].addEventListener("click", onSquareClick);
    }
    // identify legal squares
    let legalSquares = getLegalSquares("white");
    highlightLegalSquares(legalSquares);
    whiteScore === null || whiteScore === void 0 ? void 0 : whiteScore.classList.add("active");
};
// get the legal squares array
const getLegalSquares = (pieceColor) => {
    let legalSquares = [];
    // to find legal squares, it first loops through all the squares on the board and checks to see if they are occupied.
    for (let i = 0; i < squares.length; i++) {
        let row = 8 - Math.floor(i / 8);
        let col = (i % 8) + 1;
        let id = (row * 10 + col).toString();
        let square = document.getElementById(id);
        let isSquareLegal = false;
        // if it is occupied, go to the next loop
        if (isSquareOccupied(square) !== "blank")
            continue;
        // if it is not occupied, the function begins moving from the starting square in eight direnctions, checking for squares to flip.
        // if any squares are identified where their pieces can be flipped, then the starting square is considered to be legal and will be added to legalSquares array.
        let stopSquareContent = moveToEighthRow(id, pieceColor);
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
const isSquareOccupied = (square) => {
    var _a;
    if (square === null || square === void 0 ? void 0 : square.querySelector(".piece")) {
        const color = (_a = square
            .querySelector(".piece")) === null || _a === void 0 ? void 0 : _a.getAttribute("color");
        return color;
    }
    else {
        return "blank";
    }
};
const moveToEighthRow = (startingSquareId, pieceColor) => {
    // the function begins at the starting square and moves towards the eighth row, checking squares along the way.
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        // if it reaches a square with the opposite color, the square's ID will be added to a temporary array.
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToFirstRow = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToEighthColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToFirstColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToFirstRowEighthColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent == "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToFirstRowFirstColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent == "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToEighthRowEighthColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
const moveToEighthRowFirstColumn = (startingSquareId, pieceColor) => {
    const row = startingSquareId.charAt(0);
    const column = startingSquareId.charAt(1);
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(column);
    let squaresToFlipTemp = [];
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
        if (squareContent === "blank")
            return squareContent;
        squaresToFlipTemp.push(currentSquareId);
    }
    return "blank";
};
// highlight the legal squares
const highlightLegalSquares = (legalSquares) => {
    // clear any highlighted squares from the previous turn
    clearLegalSquares();
    legalSquares.forEach((square) => {
        const squareElement = document.getElementById(square);
        squareElement === null || squareElement === void 0 ? void 0 : squareElement.classList.add("legal-square");
    });
};
const clearLegalSquares = () => {
    const legalSquares = document.querySelectorAll(".legal-square");
    for (const square of legalSquares) {
        square.classList.remove("legal-square");
    }
};
// implement a click event
const onSquareClick = (e) => {
    let clickedSquare = e.currentTarget;
    let pieceColor = isWhiteTurn ? "white" : "black";
    let piece = createPiece(pieceColor);
    let isSquareLegal = false;
    let availableSquares = getLegalSquares(pieceColor);
    if (!availableSquares.includes(clickedSquare.id))
        return;
    isSquareLegal = true;
    clickedSquare.appendChild(piece);
    pieceColor === "white" ? whiteCount++ : blackCount++;
    checkAndFlip(clickedSquare.id, pieceColor);
    switchTurn();
    checkEndGame();
};
// create a piece of a specified color
const createPiece = (color) => {
    let piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    piece.setAttribute("color", color);
    let img = document.createElement("img");
    img.setAttribute("src", `./images/${color}-disc.png`);
    piece.appendChild(img);
    return piece;
};
// flip the pieces in between
const checkAndFlip = (clickedSquareId, pieceColor) => {
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
const reversePieces = (color) => {
    squaresToFlip.forEach((squareId) => {
        let square = document.getElementById(squareId);
        // remove the existing piece from the square
        while (square === null || square === void 0 ? void 0 : square.firstChild) {
            square.firstChild.remove();
        }
        // fill the target square with a piece of the opposite color
        let piece = createPiece(color);
        square === null || square === void 0 ? void 0 : square.appendChild(piece);
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
const switchTurn = () => {
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
        if (availableSquares.length === 0)
            noLegalMove = true;
    }
};
// check for the end of the game
const checkEndGame = () => {
    let message = "";
    if (!(whiteCount + blackCount === 64 ||
        whiteCount === 0 ||
        blackCount === 0 ||
        noLegalMove))
        return;
    if (whiteCount > blackCount)
        message = "White Wins!";
    if (whiteCount < blackCount)
        message = "Black Wins!";
    if (whiteCount === blackCount)
        message = "Draw!";
    showEndGameMessage(message);
};
const showEndGameMessage = (message) => {
    const alert = document.getElementById("alert");
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
const resetGame = () => {
    var _a, _b, _c, _d;
    // Clear all squares
    Array.from(squares).forEach((square) => {
        square.innerHTML = ""; // Remove any pieces
        square.classList.remove("legal-square"); // Clear highlights
    });
    // Reset starting position
    (_a = document.getElementById("44")) === null || _a === void 0 ? void 0 : _a.appendChild(createPiece("black"));
    (_b = document.getElementById("55")) === null || _b === void 0 ? void 0 : _b.appendChild(createPiece("black"));
    (_c = document.getElementById("45")) === null || _c === void 0 ? void 0 : _c.appendChild(createPiece("white"));
    (_d = document.getElementById("54")) === null || _d === void 0 ? void 0 : _d.appendChild(createPiece("white"));
    // Reset scores
    whiteCount = 2;
    blackCount = 2;
    whiteScore.innerHTML = `White Score: ${whiteCount}`;
    blackScore.innerHTML = `Black Score: ${blackCount}`;
    // Reset turn
    isWhiteTurn = true;
    whiteScore === null || whiteScore === void 0 ? void 0 : whiteScore.classList.add("active");
    blackScore === null || blackScore === void 0 ? void 0 : blackScore.classList.remove("active");
    // Recalculate legal moves for first turn
    noLegalMove = false;
    let legalSquares = getLegalSquares("white");
    highlightLegalSquares(legalSquares);
};
(_a = document.getElementById("resetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", resetGame);
setupBoard();
