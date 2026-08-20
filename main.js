// -1 - no input, 0 - rock, 1 - paper, 2 - scissors
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

// global variables (bruh), maybe pack them into a global Game class instance
let player_move = -1;
let bot_move = -1;
let has_won = false;

function moveToString(move) {
    let result = "";
    switch (move) {
        case 0:
            result = "rock";
            break;
        case 1:
            result = "paper";
            break;
        case 2:
            result = "scissors";
            break;
        default:
            result = "not a move";
            break;
    }
    return result;
}

// -----------------------------------------------------------
// entry point of the game cycle, starts on every button click
// -----------------------------------------------------------

function handlePlayerMove(event) {
    // console.log(`button value : ${event.target.dataset.value}\n`);
    // player_move = event.target.dataset.value;

    // get player move
    player_move = parseInt(event.target.dataset.value);
    console.log(`player_move: ${player_move}`);

    // return early if no button was clicked (placeholder)
    if (player_move === undefined) {
        return;
    }

    // get bot move
    handleBotMove();

    // check for win
    gameUpdate();

    // update information label
    infoUpdate();
}

function handleBotMove() {
    // random value in [0, 3) range rounded down to the nearest integer 
    bot_move = Math.floor(Math.random() * 3);
    console.log(`bot_move: ${bot_move}`);
}

function gameUpdate() {
    has_won = false;

    has_won = (player_move == ROCK && bot_move == SCISSORS) || (player_move == PAPER && bot_move == ROCK) || (player_move == SCISSORS && bot_move == PAPER);

    console.log(`has_won value: ${has_won}`);
}

function infoUpdate() {
    // console.log(`TEST: pl: ${player_move} ${typeof(player_move)}, bt: ${bot_move} ${typeof(bot_move)}`);

    info.textContent = "Your move is: " + moveToString(player_move) +  ", bot move is: " + moveToString(bot_move) + ". "; 

    // hacky tie check
    if (player_move == bot_move) {
        info.textContent += "It's a tie!"
        return;
    }

    if (has_won) {
        info.textContent += "You win! :)"
    } 
    else {
        info.textContent += "You lose! :(";
    }
}

// callback to the whole choice_area, should be more flexible than adding a callback for each button
const choice_area = document.querySelector(".choice_area.player");
choice_area.addEventListener("click", handlePlayerMove);

const info = document.getElementById("info_label");
