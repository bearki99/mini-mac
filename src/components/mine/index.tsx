import React, { ReactNode, useState, useRef, useContext } from "react";
import { memo, useEffect } from "react";
import ChatlistItem from "./c-cpns/chatlist-item";
import Chatroom from "./c-cpns/chatroom";
import { MineWrapper } from "./style";
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
    <>hi</>
    // <MineWrapper>
    //   <div className="chatHome">
    //     <div className="chatLeft">
    //       <div className="title">
    //         <h1>私信</h1>
    //       </div>
    //       {/* <div className="chatList">
    //         <div className="list-name">私信列表</div>
    //         {newData &&
    //           newData.map((item: IData) => {
    //             return (
    //               <ChatlistItem
    //                 key={item.name}
    //                 activeUser={[]}
    //                 nowUser={selectUser}
    //                 infoData={item}
    //                 handleMyClick={setselectUser}
    //               />
    //             );
    //           })}
    //       </div> */}
    //     </div>
    //     <div className="chatRight">
    //       {/* <Chatroom id={id} selectUser={selectUser} /> */}
    //     </div>
    //   </div>
    // </MineWrapper>
  );
};
export default memo(Mine);
