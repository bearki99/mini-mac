import React, { ReactNode, useRef, useState, useEffect, useMemo } from "react";
import { memo } from "react";
import styles from "./index.module.css";
import { Input } from "antd";
import { Upload, Button, Row, Col, Progress, Divider } from "antd";
import toast, { Toaster } from "react-hot-toast";
import {newRequest} from '@/http/request'
import {
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import MyServer from "@/socket";
import useMessageStore from "@/store/message";
import { Dropdown, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import request from "@/http/index";
import { ElementRef } from "react";
import PersonItem from "../person-item/index";
import Emoji from "../emoji";
import axios from "axios";
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

const UPLOAD_STATES = {
  INITIAL: 0,
  HASHING: 1,
  UPLOADING: 2,
  PAUSED: 3,
  SUCCESS: 4,
  FAILED: 5,
};
const ChatRoom: React.FC<IProps> = (props) => {
  const { id, targetType, selectUser } = props;
  // const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState<any>(null);
  const [hashPercent, setHashPercent] = useState(0);
  const [chunks, setChunks] = useState<any>([]);
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.INITIAL);
  const fileHashRef = useRef(null);
  const pendingRequest = useRef([]);
  const toastId = useRef(null);
  const DEFAULT_CHUNK_SIZE = 100 * 1024;
  const MAX_CHUNK_COUNT = 15;
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

  const initSocketEvent = () => {
    socket.on("receiveLiveMessage", async (data: any) => {
      if (data.targetType !== targetType) return;
      if (data.targetId === id) return;
      if (data.targetType === 0 && data.user.name !== selectUser) return;
      if (data.targetType === 1 && data.targetId !== id) return;
      setMessages([...messages, data]);
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
      setMessages(list.reverse());
      return list;
    } catch (error) {}
  };

  const totalPercent = useMemo(() => {
    if (!file || chunks.length < 1) return 0;
    const loaded = chunks
      .map((item: any) => item.chunk.size * item.percent)
      .reduce((acc: any, cur: any) => acc + cur);

    return (loaded / file.size).toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks]);

  const fileChunkSize = useMemo(() => {
    if (!file) return;
    const chunkCount = Math.ceil(file.size / DEFAULT_CHUNK_SIZE);
    if (chunkCount > MAX_CHUNK_COUNT) {
      return Math.ceil(file.size / MAX_CHUNK_COUNT);
    } else {
      return DEFAULT_CHUNK_SIZE;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const beforeUpload = (file: any) => {
    // clear
    reset();

    setFile(file);
    return false;
  };

  const reset = () => {
    setUploadState(UPLOAD_STATES.INITIAL);
    setHashPercent(0);
    setChunks([]);
    fileHashRef.current = null;
  };

  const shouldUpload = async (fileHash: any, fileName: any) => {
    const { data } = await axios({
      url: "http://localhost:8080/verify",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        fileHash,
        fileName,
      }),
    });
    return JSON.parse(data);
  };

  const upload = async () => {
    try {
      if (!file) return;

      if (uploadState === UPLOAD_STATES.INITIAL) {
        (toastId.current as any) = toast.loading("分片...");
        const fileChunkList = createChunks(file, fileChunkSize);

        setUploadState(UPLOAD_STATES.HASHING);
        toast.loading("计算文件hash...", { id: toastId.current as any });
        (fileHashRef.current as any) = await computeHash(fileChunkList);

        const primaryFileChunks = fileChunkList.map(({ fileChunk }, index) => ({
          fileHash: fileHashRef.current,
          chunk: fileChunk,
          hash: `${fileHashRef.current}_${index}`,
          percent: 0,
        }));
        setChunks(primaryFileChunks);
      }

      setUploadState(UPLOAD_STATES.UPLOADING);
      if (toastId.current) {
        toast.loading("分片上传中...", { id: toastId.current });
      }

      const { shouldUploadFile, uploadedChunks } = await shouldUpload(
        fileHashRef.current,
        file.name
      );
      if (!shouldUploadFile) {
        setUploadState(UPLOAD_STATES.SUCCESS);
        if (toastId.current) {
          toast.success("文件秒传成功！", { id: toastId.current });
        }

        setChunks((preChunks: any) => {
          return preChunks.map((item: any) => ({
            ...item,
            percent: 100,
          }));
        });
        return;
      }
      let chunkArr: any[] = [];
      //render chunks
      setChunks((preChunks: any) => {
        chunkArr = preChunks.map(({ fileHash, chunk, hash, percent }: any) => ({
          fileHash,
          chunk,
          hash,
          percent: uploadedChunks.includes(hash) ? 100 : percent,
        }));
        return chunkArr;
      });
      await uploadChunks(chunkArr, uploadedChunks);
    } catch (err) {
      if (toastId.current) {
        toast.error(`${err}`, { id: toastId.current });
      }

      setUploadState(UPLOAD_STATES.FAILED);
    }
  };

  const uploadChunks = async (chunks: any, uploadedChunks = []) => {
    if (chunks.length < 1) return;

    let reqList = chunks
      .filter(({ hash }: any) => !(uploadedChunks as any).includes(hash))
      .map(({ chunk, hash, fileHash }: any) => {
        let formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("fileHash", fileHash);
        formData.append("filename", file.name);
        return { formData, hash };
      })
      .map(({ formData, hash }: any) => {
        return newRequest({
          url: "http://localhost:8080",
          data: formData,
          onProgress: createProgressHandler(hash),
          requestList: pendingRequest.current,
        });
      });

    // 发送切片
    await Promise.all(reqList);
    if (reqList.length + uploadedChunks.length === chunks.length) {
      // 发送合并请求
      toast.loading("合并文件分片...");
      await mergeRequest();
      setUploadState(UPLOAD_STATES.SUCCESS);
      toast.success("文件已上传");
    } else {
      toast.error("上传失败");
      setUploadState(UPLOAD_STATES.FAILED);
    }
  };
  const createProgressHandler = (hash: any) => {
    // get initial percent
    const chunk = chunks.find((item: any) => item.hash === hash);
    const initialPercent = chunk?.percent || 0;

    return (e: any) => {
      setChunks((preChunks: any) => {
        let preChunk = preChunks.find((item: any) => item.hash === hash);
        preChunk.percent =
          initialPercent + (e.loaded / e.total) * (100 - initialPercent);
        return [...preChunks];
      });
    };
  };

  const mergeRequest = async () => {
    await newRequest({
      url: "http://localhost:8080/merge",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        fileHash: fileHashRef.current,
        fileName: file.name,
        chunkSize: fileChunkSize,
      }),
    });
  };

  const createChunks = (file: any, chunkSize = DEFAULT_CHUNK_SIZE) => {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({ fileChunk: file.slice(cur, cur + chunkSize) });
      cur += chunkSize;
    }
    return fileChunkList;
  };

  const handlePauseUpload = () => {
    setUploadState(UPLOAD_STATES.PAUSED);
    // toast("暂停上传", { id: toastId.current });
    pendingRequest.current.forEach((xhr: any) => xhr?.abort());
    pendingRequest.current = [];
  };
  const handleResumeUpload = async () => {
    try {
      setUploadState(UPLOAD_STATES.UPLOADING);
      // toast.loading("分片上传中...", { id: toastId.current });
      const { uploadedChunks } = await shouldUpload(
        fileHashRef.current,
        file.name
      );
      uploadChunks(chunks, uploadedChunks);
    } catch (err) {
      // if (toast.current) {
      //   toast.error(`${err}`, { id: toastId.current });
      // }
      setUploadState(UPLOAD_STATES.FAILED);
    }
  };

  const clearFile = () => {
    setFile(null);
    reset();
  };

  const computeHash = (fileChunks: any) => {
    return new Promise((resolve, reject) => {
      const hashWorker = new Worker("/workers/hash.js");
      hashWorker.postMessage({ fileChunks });
      hashWorker.onmessage = (e) => {
        const { percentage, hash } = e.data;
        setHashPercent(percentage.toFixed(2));
        if (hash) {
          resolve(hash);
        }
      };
    });
  };
  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(dm) + " " + sizes[i];
  };

  const showStatus = (percent: any) => {
    if (percent === 0) {
      if (uploadState === UPLOAD_STATES.FAILED)
        return (
          <>
            <CloseCircleFilled />
            {` 连接异常`}
          </>
        );
      else return `等待上传...`;
    }
    if (percent === 100) {
      return <CheckCircleFilled />;
    }
    switch (uploadState) {
      case UPLOAD_STATES.PAUSED:
        return `已暂停 [${percent.toFixed(2)}%]`;
      case UPLOAD_STATES.UPLOADING:
        return `上传中 [${percent.toFixed(2)}%]`;
      case UPLOAD_STATES.FAILED:
        return (
          <>
            <CloseCircleFilled />
            {` 上传失败`}
          </>
        );

      default:
        return;
    }
  };

  const renderChunks = () => {
    return chunks.map((chunk: any) => (
      <Row key={chunk.hash}>
        <Col span={10} className="center">
          {chunk.hash}
        </Col>
        <Col span={4} className="center">
          {formatBytes(chunk.chunk.size)}
        </Col>
        <Col span={10} className="center">
          <Progress
            percent={chunk.percent}
            format={showStatus}
            // status={
            //   uploadState === UPLOAD_STATES.FAILED && chunk.percent < 100
            //     ? "exception"
            //     : ""
            // }
            strokeColor={
              uploadState === UPLOAD_STATES.FAILED &&
              chunk.percent < 100 &&
              chunk.percent > 0
                ? ""
                : {
                    "0%": "#ffc107",
                    "100%": "#87d068",
                  }
            }
            style={{ width: "75%" }}
          />
        </Col>
      </Row>
    ));
  };

  const disableSelectFile =
    uploadState === UPLOAD_STATES.HASHING ||
    uploadState === UPLOAD_STATES.PAUSED ||
    uploadState === UPLOAD_STATES.UPLOADING;
  useEffect(() => {
    smoothScrollToBottom();
  }, [socket, messages, messages.length]);
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
