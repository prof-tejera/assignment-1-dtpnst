import React from "react";
import Duration from "../generic/Duration";

const DisplayTime = ({ value }) => {
    return (
      <div
        className="screen"
        style={{
          border: "1px solid black",
          width: 300,
          height: 70,
          textAlign: "right",
          marginBottom: 10,
        }}
      >
        {new Duration(value / 3600, (value % 3600) / 60, value % 60).formatDuration()}
      </div>
    );
  };
  
  export default DisplayTime;
  