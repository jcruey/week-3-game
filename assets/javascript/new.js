// constants
var words = {
  choices:['captainamerica','batman','ironman','thor', 'spiderman', 'hulk', 'blackwidow', 'hawkeye'],
  }
var MAX_GUESSES = 12;           // number of total guesses per game

// global variables
var currentWord = "?";                // random word user is trying to guess
var guesses = "";              // letters the player has guessed
var guessCount = MAX_GUESSES;  // number of guesses player has left

// Chooses a new random word and displays its clue on the page.
function newGame() {
  // choose a random word
  var currentWord = words.choices[Math.floor(Math.random() * words.choices.length)]
  guessCount = MAX_GUESSES;
  guesses = "";
  updatePage();   // show initial word clue - all underscores
}
// Guesses a letter.  Called when the user presses a key.
  document.onkeyup = function(event) {
    var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
    var clue = document.getElementById("clue");
    console.log(letterPicked);
    if (guessCount == 0 || clue.innerHTML.indexOf("_") < 0 ||
      guesses.indexOf(letterPicked) >= 0) {
      return;   // game is over, or already guessed this letter
    guesses += letterPicked;
    if (currentWord.indexOf(letterPicked) < 0) {
    guessCount--;      // an incorrect guess
  
}
  updatePage();
}}

// Updates the hangman image, word clue, etc. to the current game state.
function updatePage() {
  // update clue string such as "h _ l l _ "
  var clueString = "";
  for (var i = 0; i < currentWord.length; i++) {
    var letterPicked = currentWord.charAt(i);
    if (guesses.indexOf(letterPicked) >= 0) {   // letter has been guessed
      clueString += letterPicked + " ";
    } else {                              // not guessed
      clueString += "_ ";
    }
  }

  var clue = document.getElementById("clue");
  clue.innerHTML = clueString;
  
  // show the guesses the player has made
  var guessArea = document.getElementById("guesses");
  if (guessCount == 0) {
    guessArea.innerHTML = "You lose.";    // game over (loss)
  } else if (clueString.indexOf("_") < 0) {
    guessArea.innerHTML = "You win!!!";     // game over (win)
  } else {
    guessArea.innerHTML = "Guesses: " + guesses;
  }

  //update hangman image
    //var image = document.getElementById("hangmanpic");
    //image.src = "assets/images/hangman" + guessCount + ".gif";
  }