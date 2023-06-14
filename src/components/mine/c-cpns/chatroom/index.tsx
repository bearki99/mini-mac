import React, { ReactNode, useRef, useState, useEffect } from "react";
import { memo } from "react";
import styles from "./index.module.css";
import { Input, Button } from "antd";
import MyServer from "@/socket";
import useMessageStore from "@/store/message";
import { Dropdown, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import request from "@/http/index";
import { ElementRef } from "react";
import PersonItem from "../person-item/index";
import Emoji from "../emoji";
const { socket } = MyServer.getInstance();
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
  id?: string;
  selectUser?: string;
  targetType: number;
}

const ChatRoom: React.FC<IProps> = (props) => {
  const { id, targetType, selectUser } = props;
  // const [messageApi, contextHolder] = message.useMessage();

  const [inputVal, setInputVal] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const ref = useRef<ElementRef<typeof Input>>(null);
  const myRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
  const [message, saveMessage, unreadCount, initMessage] = useMessageStore(
    (s: any) => [s.message, s.saveMessage, s.unreadCount, s.initMessage]
  );
  const initSocketEvent = () => {
    socket.on("receiveLiveMessage", async (data: any) => {
      if (data.targetType !== targetType) return;
      if (data.userId === id) return;
      if (data.targetType === 0 && data.targetId !== id) return;
      if (data.targetType === 1 && data.targetId !== id) return;
      // pushMessage(data, scrollKeepToBottom);
    });
  };

  const getMessage = async () => {
    try {
      const {
        data: { list },
      } = await request.getMessage({
        targetId: id,
        targetType,
        limit: 10,
      });
      setMessages(list);
      console.log(list);
      return list;
    } catch (error) {}
  };
  useEffect(() => {
    smoothScrollToBottom();
  }, [socket, messages]);
  useEffect(() => {
    initSocketEvent();
    getMessage();
  }, []);
  async function handleSubmit() {
    let val = inputVal;
    val = val?.replaceAll(" ", "");
    if (val == "") {
    } else {
      setInputVal("");
      const message = val;
      const { data } = await request.sendMessage({
        targetId: id,
        targetType,
        message,
        messageType: 1,
      });
      setMessages([...messages, data]);
      console.log(data);
    }
  }
  // const warning = () => {
  //   messageApi.open({
  //     type: "warning",
  //     content: "输入不能为空",
  //   });
  // };
  const handleEmoji = (item: string) => {
    setShowEmoji(false);
    // socket.emit("message", {
    //   text: item,
    //   name: localStorage.getItem("username"),
    //   id: `${socket.id}${Math.random()}`,
    //   socketID: socket.id,
    //   realTime: +new Date(),
    //   time: new Date().toLocaleString(),
    //   type: 1, //把1设置为Emoji，2为文件，3为图片,
    //   sender: localStorage.getItem("username"),
    // });
  };

  return (
    <>
      {id === "" && <div>欢迎来到聊天室</div>}
      {id !== "" && (
        <>
          <div className={styles.header}>
            <div className={styles.left}>
              <div className={styles.icon}>
                <img
                  src={require(`@/assets/img/head_portrait_ki.jpg`)}
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
                    key={item.time}
                    infoData={item}
                    type={item.messageType}
                    receiverId={id as string}
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
