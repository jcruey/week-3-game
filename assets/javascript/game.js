// global variables
var remainingGuesses = 12;           // number of total guesses per game
var wins = 0;
var chosenWord = "?";                // random word user is trying to guess
var lettersGuessed = "";              // letters the player has guessed
var guessCount = remainingGuesses;  // number of guesses player has left
var maskedWord = document.getElementById("maskedWord");
var winStats = document.querySelector("#wins");
var guessArea = document.getElementById("lettersguessed");
var instructs = document.querySelector("#instructions");
var guessesRem = document.getElementById("guessesremaining");
var hideGuessed = document.getElementById("hideLetters");

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
  words.updatePage();
}
}

// constants
var words = {
  choices:['camera','background','abberation','noise', 'distortion', 'astigmatism', 'moire', 'focus', 'depth', 'aperture', 'shutter', 'lenses', 
  'lighting', 'strobe', 'reflector', 'scrim', 'bracketing', 'dynamicrange', 'highlight', 'lowlight', 'midtone', 'bokeh', 'artifact', 'flare',
  'gradient', 'filter', 'exposure', 'autofocus', 'lightmeter', 'backlit', 'backlighting', 'rimlighting', 'colortemperature', 'calibration'],
  // Chooses a new random word and displays its clue on the page.
    newGame: function() {
  // choose a random word
  var randomIndex = parseInt(Math.random() * words.choices.length);
  chosenWord = words.choices[randomIndex];
  guessCount = remainingGuesses;
  lettersGuessed = "";
  words.updatePage();   // show initial word clue - all underscores
},

// Updates the hangman image, word clue, etc. to the current game state.
updatePage: function() {
  
  // update clue string such as "h _ l l _ "
  var wordClue = "";
  for (var i = 0; i < chosenWord.length; i++) {
    var letter = chosenWord.charAt(i);
    if (lettersGuessed.indexOf(letter) >= 0) {   // letter has been guessed
      wordClue += letter + " ";
    } else {                              // not guessed
      wordClue += "_ ";
    //instructs.innerHTML ="Press any key to play"
    winStats.innerHTML = wins;
    }
  }
  
  maskedWord.innerHTML = wordClue;
  
  
  // show the guesses the player has made
   if (guessCount == 0) {
    instructs.innerHTML = "You lose." + " The word was " + chosenWord;
    lettersguessed.innerHTML = "<style>#hideLetters { display: none; }</style>";
    //hideGuessed.innerHTML = "<style>#hideLetters { display: none; }</style>";    // game over (loss)
  } else if (wordClue.indexOf("_") < 0) {
    wins++;
    instructs.innerHTML = "You win!!!"; // game over (win)
    winStats.innerHTML = wins;
    lettersguessed.innerHTML = "<style>#hideLetters { display: none; }</style>";
  } else {
    guessArea.innerHTML = guessCount; 
    guessesRem.innerHTML = lettersGuessed; 
  }
  

  // update hangman image
  var image = document.getElementById("hangmanpic");
  image.src = "assets/images/hangman" + guessCount + ".gif";

  }
}