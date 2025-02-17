import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Language from './components/Language'
import Letters from './components/Letters'
import Messaging from './components/Messaging'
import Words from './components/Words'
import Headline from './components/Headline'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Modal from './components/Modal'

function App() {
  
//LANGUAGE
  const languages = ['HTML','CSS', 'Javascript', 'React', 'TypeScript', 'Node.js', 'Python', 'Ruby', 'Assembly'];

  let LanguageStateDefault = languages.map((lang,i) => 
    ({
      id: i,
      language: lang,
      killed: false,
    })
    );

  const [languagesState, setLanguagesState] = React.useState(LanguageStateDefault)

  let languageButton = languagesState.map(languageState=> 
    <Language 
      key={languageState.id} 
      language={languageState.language} 
      killed = {languageState.killed}  
    />)

//COUNTRIES
  let [countries, setCountries] = React.useState([]);
  //FETCH WORD DATA
  React.useEffect(()=>{
    fetch('https://www.wordgamedb.com/api/v1/words/?category=country')
      .then(res => res.json())
      .then(data => setCountries(data))
  }, [])


  let [randomNumber, setRandomNumber] = React.useState(0)
  let [word, setWord] = React.useState('');
  let [lettersObjects, setLettersObjects] = React.useState([]);
  let phase = ['notStarted', 'playing', 'killed', 'won',  'lost'];
  let [playPhase, setPlayPhase] = React.useState(phase[0]);
  let [hint, setHint] = React.useState('');

//START PLAYING
  //set Random Number
  //start playPhase
  const handleStart = () => {
    if (countries.length === 0) return;
    setRandomNumber(Math.floor(Math.random() * 25));
    setPlayPhase(phase[1]);
    setOpenModal(false);
    console.log('playing started!')
    
    
  }

  const handleNewGame = () => {
    if (count === 9 || playPhase === 'won') {
      setLanguagesState(LanguageStateDefault);
      setRandomNumber(Math.floor(Math.random() * 25));
      setPlayPhase('playing');
      setCount(0);
    }
  }

// Set the word
  //Set the hint and show it
  React.useEffect(()=>{
    if(countries.length > 0) {
      setWord(countries[randomNumber].word);
      setHint(countries[randomNumber].hint);
      setShowHint(true);
    }
    console.log('playing started')
    // console.log('hint:', countries[randomNumber].)
  }, [ randomNumber])
  
// RENDER THE CUBES LETTERS OBJECTS
  React.useEffect(()=>{
    setLettersObjects(Array.from(word, (letter,i) => 
      ({id: i,
        letter: letter.toUpperCase(),
        shown: false})
      ))
    }, [word])
    
    let cubes = lettersObjects.map(item => item.shown ? <p key={item.id}>{item.letter}</p>:<p key={item.id}></p>)

   
//PLAYING SCENARIOS
  React.useEffect(()=>{
    //win scenario
    if (lettersObjects.length > 0 && lettersObjects.every(letter => letter.shown === true)) {
      setPlayPhase('won');
      setOpenModal(true);
      console.log('You WIN!!!');
    }
    console.log('For your info:',lettersObjects);
  }, [lettersObjects])


// KEYBOARD AND GUESSING (GOOD)
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  const letters = alphabet.map((letter, i) => <li key={i} id={i} letter={letter}>{letter.toUpperCase()}</li>)

  let [count, setCount] = React.useState(0);
  //Letter clicked
  const handleClickedLetter = (event) => {
    //get the clicked letter
    let clickedLetter = letters[event.target.id].props.letter;

    //check if it exists in word
    //now add messaging in case word exists
    // in case it doesn't, a language is killed
    if (word.includes(clickedLetter)) {
      // if letter correct, show it
      setLettersObjects(prevWordObject => prevWordObject.map(obj => (obj.letter === clickedLetter.toUpperCase() ? { ...obj, shown: !obj.shown } : obj)))
    } else {
      //kill a language and increase count
      setLanguagesState(prev => {
        const updatedLanguagesState = [...prev];
        updatedLanguagesState[count].killed = true;
        return updatedLanguagesState;
      })
      setCount(prevCount => prevCount + 1);
    }


  }

  React.useEffect(()=>{

    if (count > 0 && count < 9) {
      setPlayPhase('killed');
    }

    if (count === 9) {
      setPlayPhase('lost');
      setOpenModal(true);
    }
  }
  ,[count])

  
  let [showHint, setShowHint] = React.useState(false);

  

  

  const { width, height } = useWindowSize();

  let [openModal, setOpenModal] = React.useState(true);

  return (
    <>
      <div className='card'>

        <Headline />
    
        <Messaging 
          state = {playPhase}
          
          languagesState = {languagesState}
        />

        <ul className='languages'>
          {languageButton}        
        </ul>

        {/* ADD HINT */}
        {showHint && <p className='hint'>
            {hint}
        </p>}
        <Words cubes = {cubes} />
        
        <Letters letters={letters} onClick = {count < 9?handleClickedLetter:null} />

        {(count === 9 || playPhase === 'won') && <button className='startButton' onClick={handleNewGame}>New game</button>}

        {playPhase === 'won' &&<Confetti
        width={width}
        height={height}
        />}

        
        {playPhase === 'notStarted' && openModal && <Modal buttonAction='Start playing' onClose={handleStart} className='startButton'>
            <h2>Rules of the game:</h2>
            <ul>
              <li>Guess the country before all the languages are killed</li>
              <li>As simple as that :D</li>
            </ul>
            <h3>Good luck! </h3>
        </Modal>}
        
        {(count === 9 || playPhase === 'won') && openModal && <Modal buttonAction='New game' onClose={handleNewGame} className='startButton'>
            {playPhase === 'won'? <h2>Congratulations 😉</h2>:<h2>Let's do it again. You're going to WIN!!</h2>}
        </Modal>}
      
      
      </div>
    </>
  )
}

export default App
