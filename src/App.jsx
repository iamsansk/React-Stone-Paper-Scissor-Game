import { useState } from 'react'
import './App.css'
import userStoneImage from "../src/assets/uStone.png";
import userPaperImage from "../src/assets/uPaper.png";
import userScissorImage from "../src/assets/uScissor.png";
import computerStoneImage from "../src/assets/cStone.png";
import computerPaperImage from "../src/assets/cPaper.png";
import computerScissorImage from "../src/assets/cScissor.png";

function App() {
  const userButtonOptions = {
    "stone": userStoneImage,
    "paper": userPaperImage,
    "scissor":userScissorImage
  }
  const computerOptions = {
    "stone": computerStoneImage,
    "paper": computerPaperImage,
    "scissor":computerScissorImage
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
            <img src={userChoice} alt="Player" />
          </div>
          <div className={`chosen-image ${clicked ? 'vibrate' : ''}`}>
            <img src={computerChoice} alt="Computer" />
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
            <img onClick={()=>handleOptionClick("stone")} src={userStoneImage} alt="Stone" />
            <img onClick={()=>handleOptionClick("paper")} src={userPaperImage} alt="Paper" />
            <img onClick={()=>handleOptionClick("scissor")} src={userScissorImage} alt="Scissor" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
