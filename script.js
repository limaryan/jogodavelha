const cellElements = document.querySelectorAll("[dc]");
const board = document.querySelector("[db]");
const wmt = document.querySelector("[dwmt]");
const winmsn = document.querySelector("[dwm]");
const rst = document.querySelector("[rs]");

let isCircleTurn;

const wfb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const startGame = () =>{
    isCircleTurn =false;
   
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click",handleClick);
        cell.addEventListener('click',handleClick, {once: true});
    }

     setBoard();
    winmsn.classList.remove('showdwm');
}

const endGame = (isdraw) => {
    if (isdraw) {
        wmt.innerText = 'Empatou!'
    } else {
        wmt.innerText = isCircleTurn ? 'O venceu!' : 'X venceu!';
    }

    winmsn.classList.add("showdwm");
}

const checkForWin = (currentPlayer) => {
    return wfb.some(combination =>{
        return combination.every((index) =>{
                return cellElements[index].classList.contains(currentPlayer);
        });
    });  
}

const checkdraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

const placeMark = (cell,classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoard = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoard();
}

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell,classToAdd);

    const isWin = checkForWin(classToAdd);

    const isdraw = checkdraw();

    if (isWin) {
        endGame(false);
    } else if (isdraw) {
        endGame(true);
    } else {
        swapTurns();
    }
}

startGame();

rst.addEventListener('click',startGame);
