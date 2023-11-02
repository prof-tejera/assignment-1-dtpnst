import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import TimeInput from "../generic/TimeInput";
import Button from "../generic/Button";
import Duration from "../generic/Duration";
import Input from "../generic/Input";
import DisplayRounds from "../generic/DisplayRounds";

const XY = () => {
    const [currentTime, setCurrentTime] = useState(0); 
    const [countdownAmount, setCoundownAmount] = useState(new Duration(0, 0, 0)); 
    const [numRounds, setNumRounds] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleStartStopClick = () => {
        if(!isRunning && !isPaused) {
            setCurrentTime(countdownAmount.getTotalSeconds());
            setCurrentRound(1);
        }

        if(isRunning) {
            setIsPaused(true)
        }
        
        setIsRunning(!isRunning);
        
    }

    const handleResetClick = () => {
        setCurrentTime(countdownAmount.getTotalSeconds());
        setCurrentRound(1);
    }

    const handleFastForwardClick = () => {
        setCurrentTime(countdownAmount.getTotalSeconds());
        setCurrentRound((prevRound) => prevRound +1);
    }

    const handleEndTimeChange = (newEndTime) => {
        setCoundownAmount(new Duration(newEndTime.hours, newEndTime.minutes, newEndTime.seconds));
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
                setCurrentTime(countdownAmount.getTotalSeconds());
                setCurrentRound((currentRound) => currentRound + 1);
            } else {
                setIsRunning(false);
            }
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isRunning, currentTime, countdownAmount, currentRound, numRounds]);

    return (
        <Panel>
            <DisplayTime value={currentTime}/>
            <DisplayRounds value={currentRound}/>
            <TimeInput label="Time Per Round" duration={countdownAmount} onTimeChange={handleEndTimeChange} />
            <Input label="Number of Rounds" type="number" onChange={handleNumRoundsChange}/>
            <br/>
            <Button text={isRunning ? "Stop" : "Start"} onClick={handleStartStopClick} />
            <Button text="Reset" onClick={handleResetClick}/>
            <Button text="Fast Forward" onClick={handleFastForwardClick}/>   
        </Panel>
    );
};

export default XY;
