import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import useMessageStore from "@/store/message";
interface IProps {
  children?: ReactNode;
  infoData?: any;
  activeUser: any[];
  setselectName: any;
  setselectID: any;
  nowUser: any;
  unRead: number;
}

const ChatItem: React.FC<IProps> = (props) => {
  const { activeUser, infoData, setselectID, setselectName, nowUser, unRead } =
    props;
  const [message, saveMessage, unreadCount, initMessage, newSave] =
    useMessageStore((s: any) => [
      s.message,
      s.saveMessage,
      s.unreadCount,
      s.initMessage,
      s.newSave,
    ]);
  const { name, des, _id } = infoData;
  const handleClick = function (e: Event) {
    setselectID(_id);
    setselectName(name);
    const target = e.target as any;
  };
  // const isActive = newActiveUser.indexOf(name) !== -1;
  return (
    <>
      <div
        className={classNames([styles.info], {
          [styles.activeCard]: name === nowUser,
          item: true,
        })}
        data-id={infoData._id}
        data-type={infoData.type}
        onClick={(e: any) => handleClick(e)}
      >
        <div className={styles.left}>
          <div className={styles.icon}>
            <img src={require(`@/assets/img/head_portrait_bear.jpg`)} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{name}</div>
          <div className={styles.des}>{des}</div>
          <div>{unRead}</div>
        </div>
      </div>
    </>
  );
};
export default memo(ChatItem);
ChatItem.displayName = "ChatItem";
