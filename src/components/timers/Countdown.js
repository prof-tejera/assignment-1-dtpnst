import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import TimeInput from "../generic/TimeInput";
import Button from "../generic/Button";
import Duration from "../generic/Duration";

const Countdown = () => {
    const [currentTime, setCurrentTime] = useState(0); 
    const [countdownAmount, setCoundownAmount] = useState(new Duration(0, 0, 0)); 
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false)

    const handleStartStopClick = () => {
        
        if(!isRunning && !isPaused) {
            setCurrentTime(countdownAmount.getTotalSeconds());
        }

        if(isRunning) {
            setIsPaused(true)
        }
        
        setIsRunning(!isRunning);
        
    }

    const handleResetClick = () => {
        setCurrentTime(countdownAmount.getTotalSeconds());
    }

    const handleFastForwardClick = () => {
        setCurrentTime(0);
        setIsRunning(false);
    }

    const handleCountdownAmountChange = (newCountdownAmount) => {
        setCoundownAmount(new Duration(newCountdownAmount.hours, newCountdownAmount.minutes, newCountdownAmount.seconds));
    };

    useEffect(() => {
        let timerId;
        if (isRunning) {
            if (currentTime > 0) {
                timerId = setInterval(() => {
                    setCurrentTime((prevTime) => prevTime - 1); 
                }, 1000);
            } else {
                setIsRunning(false); 
            }
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isRunning, currentTime]);

    return (
        <Panel>
            <DisplayTime value={currentTime}/>
            <TimeInput label="Timer Amount" duration={countdownAmount} onTimeChange={handleCountdownAmountChange} />
            <br/>
            <Button text={isRunning ? "Stop" : "Start"} onClick={handleStartStopClick} />
            <Button text="Reset" onClick={handleResetClick}/>
            <Button text="Fast Forward" onClick={handleFastForwardClick}/>   
        </Panel>
    );
};

export default Countdown;
