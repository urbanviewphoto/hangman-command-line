// Hangman CLI
//    Consists of 
//		gWord 		hidden word the user must guess (computer assigend)
//    	Letter		a letter entered. 
//					if correct, show letter in proper position in word
//                  if not, do not change
//		Words		array of word objects that are used by the game 
//					and assigned randomly (for now will be 10 objects)
//		Topic		words will be about this topic, also randomly assigned
//					this will act as the hint
//		gDisp		blank representation of Word (_ _ _ _ _ _ )
//		guesses		number of guesses allowed to guess the Word 
//					one guess, if correct equals the letter(s) found
//					if incorrect, reduces number of guesses
//		
//		User wins if the Word is correctly guessed.
//		User loses if the number of guesses expires before the Word is 
//		guessed, and the game will start over. 

var inquirer = require('inquirer');
var Word = require('./Word.js');

var Topics = ['Photography','Music','Javascript'];  //will add more words
var Words = [{ gTopic: Topics[0],
			   gWord: 'Olympus',
			   gDisp: '_ _ _ _ _ _ _',
			   gHint: 'A Japanese mirrorless camera manufacturer'
			 },
			 { gTopic: Topics[0],
			   gWord: 'f-stop',
			   gDisp: '_ - _ _ _ _',
			   gHint: 'Common phrase for the aperture setting of a camera'
			 },
			 { gTopic: Topics[0],
			   gWord: 'Triangle',
			   gDisp: '_ _ _ _ _ _ _ _',
			   gHint: 'The Exposure _______ is that which governs the quality of a photograph'
			 },			 
			 { gTopic: Topics[0],
			   gWord: 'sensor',
			   gDisp: '_ _ _ _ _ _',
			   gHint: 'The part of the camera that actually records an image'
			 },
			 { gTopic: Topics[0],
			   gWord: 'viewfinder',
			   gisp: '_ _ _ _ _ _ _ _ _ _',
			   gHint: 'That which displays the field of view of a camera lens'
			 },
			 { gTopic: Topics[0],
			   gWord: 'histogram',
			   gDisp: '_ _ _ _ _ _ _ _ _',
			   gHint: 'The graphical representation of the tonal values of an image'
			 },
			 { gTopic: Topics[0],
			   gWord: 'mirrorless',
			   gDisp: '_ _ _ _ _ _ _ _ _ _',
			   gHint: 'A type of camera that does not have an optical viewfinder'
			 },
			 { gTopic: Topics[0],
			   gWord: 'shutter priority',
			   gDisp: '_ _ _ _ _ _ _   _ _ _ _ _ _ _ _',
			   gHint: 'The shooting mode where the camera controls the aperture'
			 },
			 { gTopic: Topics[0],
			   gWord: 'prime',
			   gDisp: '_ _ _ _ _',
			   gHint: 'A type of lens where the focal length is fixed'
			 },			 			 			 
			 { gTopic: Topics[0],
			   gWord: 'full frame',
			   gDisp: '_ _ _ _   _ _ _ _ _',
			   gHint: 'Term depicting a 35mm format camera'
			 }];

// Begin the display
function displayScreen(){
	var idx = Math.floor(Math.random() * Words.length);
	var wordsObj = Words[idx]; 

	guessWord = wordsObj.gWord;
	var guessDisp = wordsObj.gDisp;
	var guesses   = guessWord.length;

	var wordObject = new Word(guessWord);
	wordObject.makeAndPushLettersIntoWord();

	process.stdout.write('\033c'); // This clears the screen each time 
	console.log('\n\nYour topic is --> ' + wordsObj.gTopic + '\n'); 
	console.log('Your hint is ---> ' + wordsObj.gHint + '\n');
	console.log('You have ' + guesses + ' guesses left.\n\n\n');
	console.log('      ---->       ' + wordObject.display() + '       <----      \n\n');	
}

function askLetter(){
    inquirer.prompt([
    {
    type: "input",
    name: "guess",
    message: "What letter do you guess? Can you guess the word?"},
    ]).then(function(data){
    	if (data.guess.length == 1) {
		    if (guesses > 1) {
		    	guesses--;
		        wordObject.updateLetter(data.guess);

		        displayScreen();

		        askLetter();
		    } else {
		    	console.log('Ran out of guesses!'); 
		    }  		
    	} else  {
    		if (data.guess == guessWord)
    			console.log("That's Right!!"); 
    		else 
    			console.log("No, that's not it!");
    	}
    	playAgain(); 
    });
}

function playAgain(){
    inquirer.prompt([
    {
    type: "input",
    name: "replay",
    message: "Want to play again? (y or n)"},
    ]).then(function(data){
    	if (data.replay == 'y'){
    		displayScreen();
    		askLetter();      		
    	}
    });
}

displayScreen();
askLetter();




