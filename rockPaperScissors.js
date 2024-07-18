const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUserChoice = () => {
  return new Promise((resolve) => {
    rl.question('Enter your choice (rock/paper/scissors): ', (userInput) => {
      userInput = userInput.toLowerCase();
      if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
        resolve(userInput);
      } else {
        console.log('Error! Invalid choice. Please try again.');
        resolve(getUserChoice());
      }
    });
  });
};

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'The game is a tie!';
  }
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You won!';
  }
  return 'The computer won.';
}

async function playGame() {
  const userChoice = await getUserChoice();
  const computerChoice = getComputerChoice();
  console.log('You threw: ' + userChoice);
  console.log('The computer threw: ' + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
  rl.close();
}

playGame();
