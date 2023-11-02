import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import TimeInput from "../generic/TimeInput";
import Button from "../generic/Button";
import Duration from "../generic/Duration";
import Input from "../generic/Input";
import DisplayRounds from "../generic/DisplayRounds";

const Tabata = () => {
    const [currentTime, setCurrentTime] = useState(0); 
    const [workTime, setWorkTime] = useState(new Duration(0, 0, 0)); 
    const [restTime, setRestTime] = useState(new Duration(0, 0, 0)); 
    const [numRounds, setNumRounds] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isRest, setIsRest] = useState(false);

    const handleStartStopClick = () => {
        if(!isRunning && !isPaused) {
            setCurrentTime(workTime.getTotalSeconds());
            setCurrentRound(1);
        }

        if(isRunning) {
            setIsPaused(true)
        }
        
        setIsRunning(!isRunning);
        
    }

    const handleResetClick = () => {
        setCurrentTime(workTime.getTotalSeconds());
        setCurrentRound(1);
    }

    const handleFastForwardClick = () => {
        setCurrentTime(workTime.getTotalSeconds());
        setCurrentRound((prevRound) => prevRound +1);
    }

    const handleWorkTimeChange = (newWorkTime) => {
        setWorkTime(new Duration(newWorkTime.hours, newWorkTime.minutes, newWorkTime.seconds));
    };

    const handleRestTimeChange = (newRestTime) => {
        setRestTime(new Duration(newRestTime.hours, newRestTime.minutes, newRestTime.seconds));
    };

    const handleNumRoundsChange = (newNumRounds) => {
        setNumRounds(newNumRounds)
    }

    useEffect(() => {
        let timerId;
        if (isRunning) {
          if (currentTime > 0) {
            timerId = setInterval(() => {
              setCurrentTime((prevTime) => prevTime - 1);
            }, 1000);
          } else if (currentRound < numRounds) {
            if (isRest) {
              setCurrentTime(workTime.getTotalSeconds());
              setCurrentRound((currentRound) => currentRound + 1);
              setIsRest(false);
            } else {
              setCurrentTime(restTime.getTotalSeconds());
              setIsRest(true);
            }
          } else if (currentRound == numRounds && !isRest) {
            setCurrentTime(restTime.getTotalSeconds());
            setIsRest(true);
          } else {
            setIsRunning(false);
          }
        } else {
          clearInterval(timerId);
        }
      
        return () => clearInterval(timerId);
      }, [isRunning, currentTime, workTime, restTime, currentRound, numRounds, isRest]);

    return (
        <Panel>
            <DisplayTime value={currentTime}/>
            <DisplayRounds value={currentRound}/>
            <TimeInput label="Work Time" duration={workTime} onTimeChange={handleWorkTimeChange} />
            <TimeInput label="Rest Time" duration={restTime} onTimeChange={handleRestTimeChange} />
            <Input label="Number of Rounds" type="number" min="0" onChange={handleNumRoundsChange}/>
            <br/>
            <Button text={isRunning ? "Stop" : "Start"} onClick={handleStartStopClick} />
            <Button text="Reset" onClick={handleResetClick}/>
            <Button text="Fast Forward" onClick={handleFastForwardClick}/>   
        </Panel>
    );
};

export default Tabata;
