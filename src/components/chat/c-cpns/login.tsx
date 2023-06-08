import { useAlertStore, useAppsStore } from "@/store";
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
  const [openApp, closeApp] = useAppsStore((s) => [s.openApp, s.closeApp]);
  const Alert = useAlertStore((s) => s.useAlert);
  const handleLogin = async () => {
    try {
      const mydata = { name: username, pwd: password };
      const res = await request.login(mydata);

      const data = res.data as any;
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        Alert("success", res.msg);
        closeApp("login");
        openApp("chat");
      }
      // if (res.code === 200) {
      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
      //   Alert("success", res.msg);
      //   closeApp("login");
      //   openApp("chat");
      // }
    } catch (error) {
      Alert("warning", "账号/密码错误");
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
          <span className="text-primary hover:cursor-pointer">服务协议</span>和
          <span className="text-primary hover:cursor-pointer">
            隐私保护指引
          </span>
        </div>
        <div className="flex-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className={`rounded-lg w-[256px] h-[38px] text-white cursor-pointer ${
              !!username && !!password ? "bg-[#0099ff]" : "bg-[#a7dbfe]"
            }`}
          >
            Log In
          </button>
        </div>
        <div className="w-full h-auto  pt-[20px] flex-center">
          <span className="text-xs text-primary hover:cursor-pointer">
            扫码登录
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
