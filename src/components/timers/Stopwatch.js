import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import TimeInput from "../generic/TimeInput";
import Button from "../generic/Button";
import Duration from "../generic/Duration";

const Stopwatch = () => {

    const [currentTime, setCurrentTime] = useState(0);
    const [endTime, setEndTime] = useState(new Duration(0, 0, 0));
    const [isRunning, setIsRunning] = useState(false);

    const handleStartStopClick = () => {
        setIsRunning(!isRunning);
    }

    const handleResetClick = () => {
        setCurrentTime(0);
        setEndTime(new Duration(0, 0, 0));
    }

    const handleFastForwardClick = () => {
        setCurrentTime(endTime.getTotalSeconds());
        setIsRunning(false);
    }

    const handleEndTimeChange = (newEndTime) => {
        setEndTime(new Duration(newEndTime.hours, newEndTime.minutes, newEndTime.seconds));
    };

    useEffect(() => {
        let timerId;
        if (isRunning) {
          if (currentTime < endTime.getTotalSeconds()) {
            timerId = setInterval(() => {
              setCurrentTime((prevTime) => prevTime + 1); 
            }, 1000);
          } else {
            setIsRunning(false);
          }
        } else {
          clearInterval(timerId);
        }
    
        return () => clearInterval(timerId);
      }, [isRunning, currentTime, endTime]);
    
    

    return (
        <Panel>
            <DisplayTime value={currentTime}/>
            <TimeInput label="End Time" duration={endTime} onTimeChange={handleEndTimeChange} />
            <br/>
            <Button text={isRunning ? "Stop" : "Start"} onClick={handleStartStopClick} />
            <Button text="Reset" onClick={handleResetClick}/>
            <Button text="Fast Forward" onClick={handleFastForwardClick}/>   
        </Panel>
    );


};

export default Stopwatch;
