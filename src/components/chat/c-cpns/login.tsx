import React, { ReactNode, useState } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Login: React.FC<IProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div
        className="flex flex-col w-full h-full space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
        style={{
          backgroundImage: "url(/img/ui/loginbg.png)",
        }}
      >
        <div className="mt-[32px] mb-[12px] flex-center">
          <img
            src="/img/icons/turbochat.png"
            className="bg-white rounded-full"
            width={80}
            height={80}
            alt="qqavatar"
          />
        </div>
      </div>
    </>
  );
};
export default memo(Login);
Login.displayName = "Login";
