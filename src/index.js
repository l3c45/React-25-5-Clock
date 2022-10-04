import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin,faPlay,faMinus ,faPlus } from '@fortawesome/free-solid-svg-icons' 


function Clock(props){
  return <div id="clock">
  <label id="timer-label">Running</label>
  <span id="time-left">{props.time}</span>
  </div>

}

function Buttons(props){
  return <div id="buttons">
  <button onClick={props.playPause} id="start_stop">
  <FontAwesomeIcon id="a" icon={faPlay} />
  </button>
  <button onClick={props.reset}id="reset">
  <FontAwesomeIcon id="b"  icon={faArrowsSpin} />
  </button> 
  </div>
}

function Control(props){
  return <div class="control">
          <label class="title" id={props.labelId}>{props.text}</label>
          
          <button onClick={props.decrementFunc} id={props.decrement}>
          <FontAwesomeIcon icon={faMinus} />
          </button>
          <span class="length" id={props.spanId}>{props.length}</span>
          <button onClick={props.incrementFunc} id={props.increment}>
          <FontAwesomeIcon icon={faPlus} />
          </button>
          </div>
}

function App(){

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(0);
  let intervalID
  function a(){
    console.log("a")
    setTime(time+1)
  }

  return (
    <div id="container">
      <Clock time={time}/>
      <div id="controlDiv">
      <Control
       text="Break Length" 
       labelId="break-label"
       decrement="break-decrement"
       increment="break-increment"
       length={breakLength}
       spanId="break-length"
       incrementFunc={
        ()=>(
          breakLength<59&&setBreakLength(breakLength+1)
        )
       }
       decrementFunc={
        ()=>(
          breakLength>1&&setBreakLength(breakLength-1)
        )
       }
       />
      <Control
       text="Session Length" 
       labelId="session-label"
       decrement="session-decrement"
       increment="session-increment"
       length={sessionLength}
       spanId="session-length"
       incrementFunc={
        ()=>(
          sessionLength<59&&setSessionLength(sessionLength+1)
        )
       }
       decrementFunc={
        ()=>(
          sessionLength>1&&setSessionLength(sessionLength-1)
        )
       }
       />
      </div>
      <Buttons reset={
        ()=>(
          clearInterval(intervalID),
          setBreakLength(5),
          setSessionLength(25),
          setTime(25),
      
         console.log("Clicked")
        )} 

        playPause={
          ()=>(
          
            intervalID=setInterval(
              a,1000
              ),

              setTimeout(function(){clearInterval(intervalID)},sessionLength*1000)
            
          )
        }

      />
    </div>
    
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

