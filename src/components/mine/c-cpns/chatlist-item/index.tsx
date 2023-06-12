import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
interface IProps {
  children?: ReactNode;
  infoData?: any;
  activeUser: any[];
  handleMyClick?: any;
  nowUser?: string;
}

const ChatItem: React.FC<IProps> = (props) => {
  const { activeUser, infoData, handleMyClick, nowUser } = props;
  const { name, des } = infoData;
  const handleClick = function (name: string) {
    handleMyClick(name);
  };
  const newActiveUser = activeUser.map((item) => item.username);

  const isActive = newActiveUser.indexOf(name) !== -1;
  return (
    <>
      <div
        className={classNames([styles.info], {
          [styles.activeCard]: name === nowUser,
        })}
        onClick={() => handleClick(name)}
      >
        <div className={styles.left}>
          <div className={styles.icon}>
            <img
              src={require(`@/assets/img/head_portrait_bear.jpg`)}
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{name}</div>
          <div className={styles.des}>{des}</div>
        </div>
      </div>
    </>
  );
};
export default memo(ChatItem);
ChatItem.displayName = "ChatItem";
