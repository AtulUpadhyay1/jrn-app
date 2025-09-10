import React, { useState, useEffect } from "react";

function LiveDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const date = dateTime.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const time = dateTime.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

  return (
    <div className="text-sm text-gray-600 whitespace-nowrap">
      {date}, {time}
    </div>
  );
}

export default LiveDateTime;
