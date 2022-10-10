import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FaPlus,FaPlay,FaMinus,FaUndo } from "react-icons/fa"


function Clock(props){
 

  return  (
  <div id="clock">

  <label id="timer-label">{props.title}</label>
  <span id="time-left">{props.time}</span>
  <audio id="beep">
    <source type="audio/wav" src="https://github.com/l3c45/React-25-5-Clock/blob/main/public/alarm.mp3?raw=true"></source>
  </audio>
  </div>
  )
}

function Buttons(props){
  return (
     <div id="buttons">
       <button onClick={props.playPause} id="start_stop">
         <FaPlay id="a"/>
       </button>
       <button onClick={props.reset} id="reset">
         <FaUndo id="b" />
       </button> 
      </div>)
}

function Control(props){
  return (
    <div className="control">
      <label className="title" id={props.labelId}>{props.text}</label>
      <button onClick={props.decrementFunc} id={props.decrement}>
        <FaMinus />
      </button>
      <span className="length" id={props.spanId}>{props.length}</span>
      <button onClick={props.incrementFunc} id={props.increment}>
        <FaPlus/>
      </button>
    </div>)
}

function App(){
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(sessionLength+":00");
  const [intervalId, setIntervalId] = useState(0);
  const [play, setPlay] = useState(false);
  const [distance, setDistance] = useState(0);
  const [currentTime, setCurrentTime] = useState(false);

  let count=0

  function timer(){
      let second = 1000;
      let minute = second * 60;
      let hour = minute * 60;
      let end
      let div=count%2
      setPlay((prev)=>!prev)

      if(play){
        clearInterval(intervalId)
        setIntervalId(0); 
       return
      }

      if(distance!==0){
        let a=new Date().getTime()
        end=new Date(distance+a)
      }else{
         end = new Date()
        end.setMinutes(end.getMinutes() + (div===0?sessionLength:breakLength))
      }

      let newIntervalId = setInterval(showRemaining, 300);
      setIntervalId(newIntervalId);
    
      function showRemaining() {
          let now = new Date()
          let diff = distance!==0?(end - now):(end - now)+1000
         
          setDistance(diff)
              if(diff<400){
               
                clearInterval(newIntervalId)
                setIntervalId(0)
                setCurrentTime((prev)=>!prev)
                count ++
                document.getElementById("beep").play()
                timer()
                 return
              }
     
      var minutes = Math.floor((diff % hour) / minute);
      var seconds = Math.floor((diff % minute) / second);

      if (minutes<10){
        minutes="0"+minutes
      }
      if (seconds<10){
        seconds="0"+seconds
      }
      
      setTime(minutes+":"+seconds)
      
 
  }    
}
  
function reset() {
  document.getElementById("beep").pause()
  document.getElementById("beep").currentTime=0
    setCurrentTime(false) 
    setBreakLength(5)
    setSessionLength(25)
    setTime(25+":00")
    setDistance(0)
    clearInterval(intervalId);
    setIntervalId(0);
    setPlay(false)
}

  return (
    <div id="container">
      <Clock 
      title={currentTime?"Break":"Session"}
       time={time}
        play={intervalId}
       />
      <div id="controlDiv">
      <Control
       text="Break Length" 
       labelId="break-label"
       decrement="break-decrement"
       increment="break-increment"
       length={breakLength}
       spanId="break-length"
       incrementFunc={()=>(
        !play&&setBreakLength((prev)=>breakLength<59?prev+1:60)
        )}
       decrementFunc={()=>(
        !play&&setBreakLength((prev)=>breakLength>1?prev-1:1)
        )}/>
      <Control
       text="Session Length" 
       labelId="session-label"
       decrement="session-decrement"
       increment="session-increment"
       length={sessionLength}
       spanId="session-length"
       incrementFunc={()=>{
        !play&&setSessionLength((prev)=>sessionLength<59?prev+1:60)
       !play&&setTime((prev)=>sessionLength<59?(sessionLength+1)+":00":60+":00")
       !play&&setDistance(0)}
        }
       decrementFunc={()=>{
        !play&&setSessionLength((prev)=>sessionLength>1?prev-1:1)
        !play&&setTime((prev)=>sessionLength>1?(sessionLength-1)+":00":1+":00")
        !play&&setDistance(0)
          }
        }/>
      </div>
      <Buttons 
       reset={reset} 
       playPause={timer}/>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

