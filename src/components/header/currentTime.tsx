import dayjs from "dayjs";
import React, { ReactNode, useState, useEffect } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
  dark?: boolean;
}

const CurrentTime: React.FC<IProps> = (props) => {
  const { dark } = props;
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={dark ? "text-white" : ""}>
      {dayjs(time).locale("en").format("MMMD ddd HH:mm")}
    </div>
  );
};
export default memo(CurrentTime);
CurrentTime.displayName = "CurrentTime";
