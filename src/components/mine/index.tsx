import React, { ReactNode, useState, Suspense } from "react";
import { memo, useEffect } from "react";
import ChatlistItem from "./c-cpns/chatlist-item";
import Chatroom from "./c-cpns/chatroom";
import styles from "./index.module.css";
import myData from "@/assets/data/chat-data.json";
import request from "@/http/index";
import { Button, Input, Skeleton } from "antd";
import { useAlertStore, useChatStore, useUserStore } from "@/store";
import MyServer from "@/socket";
import useMessageStore from "@/store/message";
const { socket } = MyServer.getInstance();
interface IProps {
  children?: ReactNode;
  socket?: any;
}

interface IData {
  name: string;
  des: string;
}
const { Search } = Input;
const Mine: React.FC<IProps> = (props) => {
  const [users, setUsers] = useState([]);
  const [id, changeID] = useState(0);
  const [first, setFirst] = useState(true);
  const [selectName, setSelectName] = useState("");
  const [selectID, setSelectID] = useState("");
  const [query, setQuery] = useState(false);
  const [findUsers, setFindUsers] = useState([]);
  const [findGroups, setFindGroups] = useState([]);
  const [handle, setHandle] = useState(false);
  const newData = myData.filter(
    (item: IData) => item.name !== localStorage.getItem("username")
  );
  const [
    friendList,
    groupList,
    waitConfirmFriend,
    waitConfirmGroup,
    updateFriendList,
    updateGroupList,
    updateWaitConfirmFriend,
    updateWaitConfirmGroup,
  ] = useChatStore((s: any) => [
    s.friendList,
    s.groupList,
    s.waitConfirmFriend,
    s.waitConfirmGroup,
    s.updateFriendList,
    s.updateGroupList,
    s.updateWaitConfirmFriend,
    s.updateWaitConfirmGroup,
  ]);
  const [message, saveMessage, unreadCount, initMessage] = useMessageStore(
    (s: any) => [s.message, s.saveMessage, s.unreadCount, s.initMessage]
  );
  const [userName, userID] = useUserStore((s) => [s.userName, s.userID]);
  const init = async () => {
    try {
      await updateFriendList();
      await updateGroupList();
      await updateWaitConfirmFriend();
      await updateWaitConfirmGroup();
      const newgroupList = groupList.map((item: any) => {
        return item._id;
      });
      socket.emit("initSocketRoom", newgroupList, "group");
    } catch (error) {}
  };
  const initSocketEvent = () => {
    socket.on("receiveMessage", async (data) => {
      const targetIdInRoom =
        data.targetType === 0 ? data.userId : data.targetId;
      if (message.inChatRoom && targetIdInRoom === message.id) return;
      const user = JSON.parse(localStorage.getItem("user") || "");
      if (data.userId === user._id) return;
      if (data.targetType === 0 && data.targetId !== user._id) return;
      const flag = message.messageList.some((item: any) => {
        const targetType = item.type === "user" ? 0 : 1;
        const targetId = item.type === "user" ? data.userId : data.targetId;
        if (item._id === targetId && targetType === data.targetType) {
          item.unreadCount += 1;
          item.lastMessage = data;
          saveMessage();
          return true;
        }
        return false;
      });
      if (!flag && data.userId !== undefined && data.targetId !== undefined) {
        const _id = data.targetType === 0 ? data.userId : data.targetId;
        const type = data.targetType === 0 ? "user" : "group";
        message.messageList.push({
          _id,
          type,
          unreadCount: 1,
        });
        saveMessage();
        if (message.inChatRoom) return;
        initMessage();
      }
    });
    socket.on("receiveApply", async (data) => {
      if ("friendState" in data) {
        updateWaitConfirmFriend();
      } else if ("groupState" in data) {
        updateWaitConfirmGroup();
      }
    });
  };
  const [alert] = useAlertStore((s) => [s.useAlert]);
  useEffect(() => {
    // 获取好友列表
    init();
    initSocketEvent();
    initMessage();
  }, []);
  const onSearch = async (value: string) => {
    setFirst(false);
    request.searchUser({ keyword: value }).then(
      (res) => {
        setFindUsers(res.data.list);
      },
      (err) => {}
    );
    request.searchGroup({ keyword: value }).then(
      (res) => {
        setFindGroups(res.data.list);
      },
      (err) => {}
    );
  };
  return (
    <div
      className="w-full h-full bg-[#343540] rounded-lg shadow-lg"
      style={{
        minHeight: "400px",
      }}
    >
      <div className="fixed rounded-t-lg w-full top-0 h-7bg-[#343540]"></div>
      <div className="flex flex-col px-3 py-6">
        <div className={styles.chatHome}>
          <div className={styles.menu}>
            <button
              onClick={() => {
                setQuery(!query);
                setHandle(false);
                setSelectName("");
                setSelectID("");
              }}
            >
              查询
            </button>
            <div>
              <button
                className="mt-3"
                onClick={() => {
                  setHandle(!handle);
                  setQuery(false);
                  setSelectName("");
                  setSelectID("");
                }}
              >
                处理请求
              </button>
            </div>
          </div>
          <div className={styles.chatLeft}>
            <div
              className="chatList"
              onClick={() => {
                setQuery(false);
                setHandle(false);
              }}
            >
              <div className="list-name">好友列表</div>
              {friendList.length > 0 &&
                friendList &&
                friendList.map((item: any) => {
                  return (
                    <ChatlistItem
                      key={item._id}
                      activeUser={[]}
                      nowUser={selectName}
                      infoData={item}
                      setselectName={setSelectName}
                      setselectID={setSelectID}
                    />
                  );
                })}
              {friendList.length === 0 && (
                <div className=" mt-4">您好，您还没有好友</div>
              )}
            </div>
          </div>
          <div className={styles.chatRight}>
            {!query && !handle && (
              <Chatroom
                key={selectID}
                id={selectID}
                targetType={0}
                selectUser={selectName}
              />
            )}
            {query && (
              <>
                <Search
                  allowClear
                  enterButton="Search"
                  placeholder="请输入您想查询的用户 / 群组"
                  onSearch={onSearch}
                />
                {!first && (
                  <>
                    <div className="mt-5">
                      <span>查询用户结果</span>
                      <Suspense fallback={<Skeleton />}>
                        {findUsers.length > 0 &&
                          findUsers.map((item: any) => {
                            if (friendList.indexOf(item._id) !== -1)
                              return <></>;
                            return (
                              <div
                                key={item._id}
                                className="flex items-center justify-between"
                              >
                                <div>{item.name}</div>
                                {item.name !== userName && (
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      request
                                        .addFriend({ friendId: item._id })
                                        .then(
                                          (res) => {
                                            alert(
                                              "success",
                                              "已申请该好友",
                                              4000
                                            );
                                          },
                                          (err) => {
                                            alert("warning", err, 4000);
                                          }
                                        );
                                    }}
                                  >
                                    申请好友
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        {findUsers.length === 0 && <div>无</div>}
                      </Suspense>
                    </div>
                    <div className="mt-5">
                      <span>查询群组结果</span>
                      <Suspense fallback={<Skeleton />}>
                        {findGroups.length > 0 &&
                          findGroups.map((item: any) => {
                            if (groupList.indexOf(item._id) !== -1)
                              return <></>;
                            return (
                              <div
                                key={item._id}
                                className="flex items-center justify-between"
                              >
                                <div>{item.name}</div>
                                <Button
                                  type="primary"
                                  onClick={() => {
                                    request
                                      .joinGroup({ groupId: item._id })
                                      .then(
                                        (res) => {
                                          alert(
                                            "success",
                                            "已申请该群组",
                                            4000
                                          );
                                        },
                                        (err) => {
                                          alert("warning", err, 4000);
                                        }
                                      );
                                  }}
                                >
                                  申请群组
                                </Button>
                              </div>
                            );
                          })}
                        {findGroups.length === 0 && <div>无</div>}
                      </Suspense>
                    </div>
                  </>
                )}
              </>
            )}
            {handle && (
              <>
                <div>
                  <div>好友请求</div>
                  {waitConfirmFriend.length > 0 &&
                    waitConfirmFriend.map((item: any) => {
                      return (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div>{item.name}</div>
                          <Button
                            type="primary"
                            onClick={() => {
                              request.agreeFriend({ friendId: item._id }).then(
                                (res) => {
                                  alert("success", "已同意该用户申请", 4000);
                                  updateWaitConfirmFriend();
                                  updateFriendList();
                                },
                                (err) => {
                                  alert("warning", err, 4000);
                                }
                              );
                            }}
                          >
                            同意申请
                          </Button>
                        </div>
                      );
                    })}
                  {waitConfirmFriend.length === 0 && (
                    <div className="mt-3">无好友请求</div>
                  )}
                  <div className="mt-3">群组请求</div>
                  {waitConfirmGroup.length > 0 &&
                    waitConfirmGroup.map((item: any) => {
                      return (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div>{item.name}</div>
                          <Button
                            type="primary"
                            onClick={() => {
                              request
                                .agreeGroup({
                                  groupId: item._id,
                                  userId: userID,
                                })
                                .then(
                                  (res) => {
                                    alert("success", "已同意该群组申请", 4000);
                                    updateWaitConfirmGroup();
                                    updateGroupList();
                                  },
                                  (err) => {
                                    alert("warning", err, 4000);
                                  }
                                );
                            }}
                          >
                            同意申请
                          </Button>
                        </div>
                      );
                    })}
                  {waitConfirmGroup.length === 0 && (
                    <div className="mt-3">无群组请求</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Mine);
