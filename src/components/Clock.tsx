import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Shanghai",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getShanghaiTime() {
  return formatter.format(new Date());
}

export default function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setTime(getShanghaiTime());
    const timer = window.setInterval(() => setTime(getShanghaiTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="clock" aria-label={`Current time in Shanghai: ${time}`}>
      <i aria-hidden="true" />
      <span>SHANGHAI · {time}</span>
    </span>
  );
}
