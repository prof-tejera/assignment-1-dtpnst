import React from 'react';
import Panel from '../generic/Panel';
import DisplayTime from '../generic/DisplayTime';
import DisplayRound from '../generic/DisplayRound';
import Button from '../generic/Button';

const Timer = ({
  currentTime,
  currentRound,
  handleStartStopClick,
  handleResetClick,
  handleFastForwardClick,
  isRunning,
}) => {
  return (
    <Panel>
      <DisplayTime value={currentTime} />
      {currentRound !== undefined && <DisplayRound value={currentRound} />}
      <Button text={isRunning ? "Stop" : "Start"} onClick={handleStartStopClick} />
      <Button text="Reset" onClick={handleResetClick} />
      <Button text="Fast Forward" onClick={handleFastForwardClick} />
    </Panel>
  );
};

export default Timer;