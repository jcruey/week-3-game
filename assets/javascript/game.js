// constants
var words = {
  choices:['camera','background','abberation','noise', 'distortion', 'astigmatism', 'moire', 'focus', 'depth', 'aperture', 'shutter', 'lenses', 
  'lighting', 'strobe', 'reflector', 'scrim', 'bracketing', 'dynamicrange', 'highlight', 'lowlight', 'midtone', 'bokeh', 'artifact', 'flare',
  'gradient', 'filter', 'exposure', 'autofocus', 'lightmeter', 'backlit', 'backlighting', 'rimlighting', 'colortemperature', 'calibration'],
  }
var remainingGuesses = 12;           // number of total guesses per game
var wins = 0;

// global variables
var chosenWord = "?";                // random word user is trying to guess
var lettersGuessed = "";              // letters the player has guessed
var guessCount = remainingGuesses;  // number of guesses player has left
var maskedWord = document.getElementById("maskedWord");
var winStats = document.querySelector("#wins");
var guessArea = document.getElementById("lettersguessed");

// Chooses a new random word and displays its clue on the page.
function newGame() {
  // choose a random word
  var randomIndex = parseInt(Math.random() * words.choices.length);
  chosenWord = words.choices[randomIndex];
  guessCount = remainingGuesses;
  lettersGuessed = "";
  updatePage();   // show initial word clue - all underscores
}

// Guesses a letter when the user presses a key.
function guessLetter() {
  document.onkeyup = function(event) {
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
  var maskedWord = document.getElementById("maskedWord");
  if (guessCount == 0 || maskedWord.innerHTML.indexOf("_") < 0 ||
      lettersGuessed.indexOf(letter) >= 0) {
    return;   // game is over, or already guessed this letter
  }
  lettersGuessed += letter;
  if (chosenWord.indexOf(letter) < 0) {
    guessCount--;      // an incorrect guess
  }
  updatePage();
}
}
// Updates the hangman image, word clue, etc. to the current game state.
function updatePage() {
  
  // update clue string such as "h _ l l _ "
  var wordClue = "";
  for (var i = 0; i < chosenWord.length; i++) {
    var letter = chosenWord.charAt(i);
    if (lettersGuessed.indexOf(letter) >= 0) {   // letter has been guessed
      wordClue += letter + " ";
    } else {                              // not guessed
      wordClue += "_ ";
    }
  }
  
  maskedWord.innerHTML = wordClue;
  
  
  // show the guesses the player has made
   if (guessCount == 0) {
    guessArea.innerHTML = "You lose.";    // game over (loss)
  } else if (wordClue.indexOf("_") < 0) {
    guessArea.innerHTML = "You win!!!" && wins++; 
    
    winStats.innerHTML ="Wins: " + wins;    // game over (win)
  } else {
    guessArea.innerHTML = "Guesses remaining: " + guessCount + "<br>" + "Guessed letters: " + lettersGuessed;
  }
  

  // update hangman image
  var image = document.getElementById("hangmanpic");
  image.src = "assets/images/hangman" + guessCount + ".gif";
}