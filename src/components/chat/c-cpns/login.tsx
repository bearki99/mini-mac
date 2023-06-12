import { useAlertStore, useAppsStore, useUserStore } from "@/store";
import React, { ReactNode, useState } from "react";
import { memo } from "react";
import request from "@/http/index";
interface IProps {
  children?: ReactNode;
}

const Login: React.FC<IProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [isRegister, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [openApp, closeApp] = useAppsStore((s) => [s.openApp, s.closeApp]);
  const Alert = useAlertStore((s) => s.useAlert);
  const [userName, setUserName] = useUserStore((s) => [
    s.userName,
    s.setUserName,
  ]);
  const handleLogin = async (isRegister: boolean) => {
    try {
      // 登录逻辑
      if (!isRegister) {
        const mydata = { name: username, pwd: password };
        const res = await request.login(mydata);

        const data = res.data as any;
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(data));
          setUserName(data.name);
          localStorage.setItem("token", data.token);
          Alert("success", res.msg);
          closeApp("login");
          openApp("chat");
        } else {
          setUserName("");
        }
      } else {
        // 进行注册
        try {
          await request.register({
            name: username,
            pwd: password,
            checkPwd: password,
            email: email,
          });
        } catch (error) {
          if (typeof error !== "string") {
            Alert("success", "注册成功");
            localStorage.setItem("username", username);
          } else Alert("warning", error);
        }
      }
    } catch (error) {
      if (isRegister) Alert("warning", error as string);
      else Alert("warning", "账号/密码错误");
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-full h-full space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
        style={{
          backgroundImage: "url(/img/ui/loginbg.png)",
        }}
      >
        {/* logo */}
        <div className="mt-[32px] mb-[12px] flex-center">
          <img
            src="/img/icons/turbochat.png"
            className="bg-white rounded-full"
            width={80}
            height={80}
            alt="qqavatar"
          />
        </div>
        {/* 输入框 */}
        {!isRegister ? (
          <>
            <div className="h-[42px] flex text-black font-black flex-center">
              <div className="h-full w-[60px] bg-white  flex-center"></div>
              <input
                type="text"
                placeholder="Username"
                className="h-full w-[130px] text-lg focus:outline-none"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="h-full w-[60px] bg-white"></div>
            </div>
            <div className="h-[42px] flex text-black font-bold flex-center">
              <div className="h-full w-[60px] bg-white  flex-center"> </div>
              <input
                type="password"
                placeholder="Password"
                className="h-full w-[130px] text-lg focus:outline-none"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="h-full w-[60px] bg-white"></div>
            </div>
            <div className="text-[12px] m-auto flex justify-start items-center text-[#999] flex-center">
              <button
                className={`flex-center w-4 h-4 border-[1px] mr-1 border-[#b2c1cb] rounded-full  text-white  ${
                  check ? "bg-[#0099ff]" : ""
                }`}
                onClick={() => setCheck(!check)}
              >
                {check ? "√" : ""}
              </button>
              已阅读并同意
              <span className="text-primary hover:cursor-pointer">
                服务协议
              </span>
              和
              <span className="text-primary hover:cursor-pointer">
                隐私保护指引
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="h-[42px] flex text-black font-black flex-center">
              <div className="h-full w-[60px] bg-white  flex-center"></div>
              <input
                type="text"
                placeholder="Username"
                className="h-full w-[140px] text-lg focus:outline-none"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="h-full w-[60px] bg-white"></div>
            </div>
            <div className="h-[42px] flex text-black font-bold flex-center">
              <div className="h-full w-[60px] bg-white  flex-center"> </div>
              <input
                type="password"
                placeholder="Password"
                className="h-full w-[140px] text-lg focus:outline-none"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="h-full w-[60px] bg-white"></div>
            </div>
            <div className="h-[42px] flex text-black font-black flex-center">
              <div className="h-full w-[60px] bg-white  flex-center"></div>
              <input
                type="text"
                placeholder="Email"
                className="h-full w-[140px] text-lg focus:outline-none"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="h-full w-[60px] bg-white"></div>
            </div>
          </>
        )}

        <div className="flex-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(isRegister);
            }}
            className={`rounded-lg w-[256px] h-[38px] text-white cursor-pointer ${
              !!username && !!password ? "bg-[#0099ff]" : "bg-[#a7dbfe]"
            }`}
          >
            {!isRegister ? "Log In" : "Register"}
          </button>
        </div>
        <div className="w-full h-auto  pt-[20px] flex-center">
          <span
            className="text-xs text-primary hover:cursor-pointer"
            onClick={() => setRegister(!isRegister)}
          >
            {!isRegister ? "用户注册" : "登录"}
          </span>
          <span className="mx-2">|</span>
          <span className="text-xs text-primary hover:cursor-pointer ">
            更多选项
          </span>
        </div>
      </div>
    </>
  );
};
export default memo(Login);
Login.displayName = "Login";
