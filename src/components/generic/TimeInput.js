import React from "react";

const TimeInput = ({ label, duration, onTimeChange }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = value === '' ? 0 : parseInt(value, 10);
        onTimeChange({ ...duration, [name]: isNaN(numericValue) ? 0 : numericValue });
    };
  
    return (
      <div>
        <label>{label}:</label>
        <input
          type="number"
          min="0"
          max="24"
          name="hours"
          value={duration.hours}
          onChange={handleInputChange}
        />
        <span> hours</span>
        <input
          type="number"
          min="0"
          max="59"
          name="minutes"
          value={duration.minutes}
          onChange={handleInputChange}
        />
        <span> minutes</span>
        <input
          type="number"
          min="0"
          max="59"
          name="seconds"
          value={duration.seconds}
          onChange={handleInputChange}
        />
        <span> seconds</span>
      </div>
    );
  };


export default TimeInput;