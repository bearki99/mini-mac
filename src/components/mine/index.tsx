import React, { ReactNode, useState, useRef, useContext } from "react";
import { memo, useEffect } from "react";
import ChatlistItem from "./c-cpns/chatlist-item";
import Chatroom from "./c-cpns/chatroom";
import styles from "./index.module.css";
import myData from "@/assets/data/chat-data.json";

interface IProps {
  children?: ReactNode;
  socket?: any;
}

interface IData {
  name: string;
  des: string;
}

const Mine: React.FC<IProps> = (props) => {
  const [users, setUsers] = useState([]);
  const [id, changeID] = useState(0);
  const [selectUser, setselectUser] = useState("");

  const newData = myData.filter(
    (item: IData) => item.name !== localStorage.getItem("username")
  );
  return (
    // <MineWrapper>
    <div className="w-full h-full bg-[#343540] rounded-lg shadow-lg"
    style={{
      minHeight: "400px"
    }}>
      <div className="fixed rounded-t-lg w-full top-0 h-7bg-[#343540]"></div>
      <div className="flex flex-col px-3 py-6">
        <div className={styles.chatHome}>
          <div className={styles.chatLeft}>
            <div className={styles.title}>
              <h1>私信</h1>
            </div>
            <div className="chatList">
              <div className="list-name">好友列表</div>
              {newData &&
                newData.map((item: IData) => {
                  return (
                    <ChatlistItem
                      key={item.name}
                      activeUser={[]}
                      nowUser={selectUser}
                      infoData={item}
                      handleMyClick={setselectUser}
                    />
                  );
                })}
            </div>
          </div>
          <div className={styles.chatRight}>
            <Chatroom id={id} selectUser={selectUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Mine);
