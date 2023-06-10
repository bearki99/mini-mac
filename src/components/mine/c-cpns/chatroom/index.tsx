import React, { ReactNode, useRef, useState, useEffect } from "react";
import { memo } from "react";
import styles from './index.module.css'
import { Input, Button } from "antd";
import { message } from "antd";
import { Dropdown } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { ElementRef } from "react";
import PersonItem from "../person-item/index";
import Emoji from "../emoji";

interface IMessage {
  id: string;
  text: string;
  name: string;
  socketID: string;
  time: string;
  type: number;
  realTime: number;
  sender: string;
  render: string;
}

interface IProps {
  children?: ReactNode;
  id?: number;
  socket?: any;
  selectUser?: string;
}

const ChatRoom: React.FC<IProps> = (props) => {
  const { socket, selectUser } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const [inputVal, setInputVal] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const ref = useRef<ElementRef<typeof Input>>(null);
  const myRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const from = localStorage.getItem("username") as string;

  const smoothScrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const chatContentHeight = chatContainer.scrollHeight;
      const scrollDuration = 500;
      let startTime = 0;
      const startScrollTop = chatContainer.scrollTop;
      const endScrollTop = chatContentHeight - chatContainer.clientHeight;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      const animateScroll = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const elapsedTime = timestamp - startTime;
        const progress = easeInOutCubic(elapsedTime / scrollDuration);
        const newScrollTop =
          startScrollTop + progress * (endScrollTop - startScrollTop);
        chatContainer.scrollTo({ top: newScrollTop, behavior: "auto" });
        if (elapsedTime < scrollDuration) {
          requestAnimationFrame(animateScroll);
        } else {
          chatContainer.scrollTo({ top: chatContentHeight, behavior: "auto" });
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };
  const handleTransmit = () => {
    myRef.current?.click();
  };

  useEffect(() => {
    smoothScrollToBottom();
  }, [socket, messages]);

  function handleSubmit() {
    let val = inputVal;
    val = val?.replaceAll(" ", "");
    if (val == "") warning();
    else {
      // socket.emit("message", {
      //   text: val,
      //   name: localStorage.getItem("username"),
      //   id: `${socket.id}${Math.random()}`,
      //   socketID: socket.id,
      //   time: new Date().toLocaleString(),
      //   realTime: +new Date(),
      //   type: 0, //把0设置为文本,
      //   sender: localStorage.getItem("username"),
      // });
      setInputVal("");
    }
  }
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "输入不能为空",
    });
  };
  const handleEmoji = (item: string) => {
    setShowEmoji(false);
    socket.emit("message", {
      text: item,
      name: localStorage.getItem("username"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      realTime: +new Date(),
      time: new Date().toLocaleString(),
      type: 1, //把1设置为Emoji，2为文件，3为图片,
      sender: localStorage.getItem("username"),
    });
  };

  return (
    <>
      {selectUser === "" && <div>欢迎来到聊天室</div>}
      {selectUser !== "" && (
        <>
          <div className={styles.header}>
            <div className={styles.left}>
              <div className={styles.icon}>
                <img
                  src={require(`@/assets/img/head_portrait_${selectUser}.jpg`)}
                  alt=""
                />
                <span>{selectUser}</span>
              </div>
            </div>
            <div className={styles.right}>
              <button className={styles.rightbtn}>
                <div className={styles.transmit} onClick={handleTransmit}>
                  <input
                    type="file"
                    multiple={true}
                    className={styles.input}
                    ref={myRef}
                  />
                  <CopyOutlined />
                </div>
              </button>
            </div>
          </div>
          <div className={styles.mainContent} ref={chatContainerRef}>
            {messages &&
              messages.map((item: any) => {
                return (
                  <PersonItem
                    key={item.realTime}
                    infoData={item}
                    type={item.type}
                  />
                );
              })}
          </div>
          <div className={styles.footer}>
            <Input.Group size="large" className={styles.inputGroup}>
              {/* emoji表情 */}
              <Dropdown
                placement="topLeft"
                trigger={["click"]}
                open={showEmoji}
                onOpenChange={setShowEmoji}
                dropdownRender={() => <Emoji handleEmoji={handleEmoji} />}
                arrow={{ pointAtCenter: true }}
              >
                <Button className={styles.myBtn1}>
                  <img
                    src={require("@/assets/img/emoji/smiling-face.png")}
                    alt=""
                  />
                </Button>
              </Dropdown>
              <Input
                style={{ width: "calc(100% - 200px)" }}
                placeholder="请输入聊天内容"
                onPressEnter={handleSubmit}
                onChange={(e) => setInputVal(e.target.value)}
                value={inputVal}
                ref={ref}
                className={styles.myinput}
              />
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                className={styles.mybtn}
              >
                发送
              </Button>
            </Input.Group>
          </div>
        </>
      )}
    </>
  );
};
export default memo(ChatRoom);
ChatRoom.displayName = "ChatRoom";
