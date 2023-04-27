import React, { useEffect, useState } from 'react';
//import { generatePath } from 'react-router-dom';

const Main = () => {
  const [userChoice, setUserChoice] = useState('rock');
  const [compChoice, setCompChoice] = useState('rock');
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [result, setResult] = useState('Lets see who wins the game!');
  const [turnResult, setTurnResult] = useState(null);
  const [gameover, setGameover] = useState(false);

  const choices = ['rock', 'paper', 'scissors'];

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)];
    setCompChoice(random);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const moves = userChoice + compChoice;
    if (userScore <= 9 || compScore <= 9) {
      if (moves === 'rockscissors' || moves === 'scissorspaper' || moves === 'paperrock') {
        const updatedUserScore = userScore + 1;
        setUserScore(updatedUserScore);
        setTurnResult(`You won!! as you chose ${userChoice} and computer chose ${compChoice}`);
        if (updatedUserScore === 10) {
          setResult('You won the game!!');
          setGameover(true);
        }
      }

      if (moves === 'paperscissors' || moves === 'rockpaper' || moves === 'scissorsrock') {
        const updatedCompScore = compScore + 1;
        setCompScore(updatedCompScore);
        setTurnResult(`You lost!! as you chose ${userChoice} and the computer chose ${compChoice}`);
        if (updatedCompScore === 10) {
          setResult('Computer won the game!!');
          setGameover(true);
        }
      }

      if (moves === 'paperpaper' || moves === 'scissorsscissors' || moves === 'rockrock') {
        setTurnResult(`nobody won as it was a draw !! as you chose ${userChoice} and computer chose ${compChoice}`);
      }
    }
  }, [userChoice, compChoice, userScore, compScore]);

  return (
    <div className='main'>
      <div className='score'>
        <h1>User Score - {userScore} </h1>
        <h1>Computer Score - {compScore} </h1>
      </div>

      <div className='choice'>
        <div className='user-choice'>
          <img className='user-hand' src={`../images/${userChoice}.png`} width='200px' height='50px' alt='User choice'></img>
        </div>

        <div className='comp-choice'>
          <img className='comp-hand' src={`../images/${compChoice}.png`} width='200px' height='50px' alt='Computer choice'></img>
        </div>
      </div>

      <div className='button-div'>
        {choices.map((choice, index) => (
          <button className='button' key={index} onClick={() => handleClick(choice)}>
            {choice}
          </button>
        ))}
      </div>

    <div className='result'>
<h1>Turn Result - {turnResult}</h1>
<h1>Final Result - {result}</h1>
    </div>

    <div className='restart-div'>{gameover && 
    <button className='reset' onClick={() => {reset()}}>Restart ?</button>
    }
    </div>
</div>

  )
}

export default Main;