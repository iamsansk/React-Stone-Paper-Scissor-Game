import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const userButtonOptions = {
    "stone": "../src/assets/uStone.png",
    "paper": "../src/assets/uPaper.png",
    "scissor":"../src/assets/uScissor.png"
  }
  const computerOptions = {
    "stone": "../src/assets/cStone.png",
    "paper": "../src/assets/cPaper.png",
    "scissor":"../src/assets/cScissor.png"
  }
  const userWinningChances = [
    ["stone","scissor"],
    ["paper","stone"],
    ["scissor","paper"]
  ];
  const computerWinningChances = [
    ["scissor","stone"],
    ["stone","paper"],
    ["paper","scissor"]
  ];
  let randomChoice;

  const [userChoice,setUserChoice] = useState(userButtonOptions["paper"]);
  const [computerChoice,setComputerChoice] = useState(computerOptions["paper"]);
  const [clicked,setClicked] = useState(false);
  const [playerScore,setPlayerScore] = useState(0);
  const [computerScore,setComputerScore] = useState(0);
  const [winningMessage,setWinningMessage] = useState("Let's Play!!!");

  const handleOptionClick = (userOption)=>{
    setWinningMessage("...");
    setClicked(true);
    setTimeout(()=>{
      setClicked(false);
      setUserChoice(userButtonOptions[userOption]);
      randomComputerChoice();
      checkWin(userOption,randomChoice);
    },500);
  }
  const randomComputerChoice = ()=>{
    let options = ["stone","paper","scissor"]
    randomChoice = options[Math.floor(Math.random() * 3)];
    setComputerChoice(computerOptions[randomChoice]);
  }
  function checkWin(userChoice,computerChoice){
    if(userChoice === computerChoice){
      setWinningMessage("Draw!!!");
      return;
    }
    let isUserWin = userWinningChances.some(([userWinOpt,computerLoseOpt])=>userWinOpt===userChoice && computerLoseOpt===computerChoice);
    if(isUserWin){
      setPlayerScore(prev=>prev+1);
      setWinningMessage("You WIN!!!");
      return;
    }
    else{
      let isComputerWin = computerWinningChances.some(([userLoseopt,computerWinOpt])=>userLoseopt===userChoice && computerWinOpt===computerChoice);
      if(isComputerWin){
        setComputerScore(prev=>prev+1);
        setWinningMessage("Bot WIN!!!");
        return;
      }
    }
  }
  return (
    <>
      <div className="main-game-container">
        <h1 className='title'>Stone Paper Scissor Game</h1>

        {/* Score Board */}
        <div className="player-score">
          <p>You : {playerScore}</p>
          <p>:    SCORE    :</p>
          <p>Bot : {computerScore}</p>
        </div>

        {/* Game Area */}
        <div className="game-area">
          <div className={`chosen-image ${clicked ? 'vibrate' : ''}`}>
            <img src={userChoice} alt="" />
          </div>
          <div className={`chosen-image ${clicked ? 'vibrate' : ''}`}>
            <img src={computerChoice} alt="" />
          </div>
        </div>

        {/* Winning Message */}
        <p className="winning-message">{winningMessage}</p>

        {/* User Options */}
        <div className="user-options">
          <div>
            <p>Pick Your Move 👇</p>
          </div>
          <div className='user-option-buttons'>
            <img onClick={()=>handleOptionClick("stone")} src="../src/assets/uStone.png" alt="" />
            <img onClick={()=>handleOptionClick("paper")} src="../src/assets/uPaper.png" alt="" />
            <img onClick={()=>handleOptionClick("scissor")} src="../src/assets/uScissor.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
