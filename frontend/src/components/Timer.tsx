import { PiTimerFill } from "react-icons/pi";
import Button from "./ui/Button";
import { useRef, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import Tooltip from "./ui/Tooltip";

const Timer = () => {
  const [time, setTime] = useState<number>(-1);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  const handleStartTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 100);
  };
  const handlePauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else handleStartTimer();
  };
  const getFormatedTime = (time: number) => {
    time = Math.floor(time / 10);
    return time < 10 ? `0${time}` : `${time}`;
  };
  const getTime = (seconds: number): string => {
    const hrs = getFormatedTime(Math.floor((seconds / (3600*10))));
    const mins = getFormatedTime(Math.floor((seconds % (3600*10)) / 60));
    const secs = getFormatedTime(seconds % (60 * 10));
    return `${hrs}:${mins}:${secs}`;
  };
  return (
    <>
      {time == -1 ? (
        <Button
          onClick={handleStartTimer}
          className="p-1 text-lg"
        >
          <PiTimerFill className="dark:text-zinc-200" />
          <Tooltip position="top" title="Start" />
        </Button>
      ) : (
        <div className="flex gap-1">
          <Button
            onClick={handlePauseTimer}
            className="group relative w-20 justify-center"
          >
            {getTime(time)}
            <Tooltip position="top" title={"Pause/Resume"} />
          </Button>
          <Button
            onClick={() => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setTime(-1);
            }}
            className="group relative px-2"
          >
            <GrPowerReset className="dark:text-zinc-200" />
            <Tooltip position="top" title="Reset" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Timer;
