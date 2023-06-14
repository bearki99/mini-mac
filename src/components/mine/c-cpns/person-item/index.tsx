import React, { ReactNode } from "react";
import { memo } from "react";
import { Avatar } from "antd";
import classNames from "classnames";

import styles from "./style.module.css";
interface IProps {
  children?: ReactNode;
  infoData?: any;
  type: number;
  receiverId: string;
}

const PersonItem: React.FC<IProps> = (props) => {
  const { infoData, type, receiverId } = props;
  const { text, name, time, message, userId
  } = infoData;
  console.log(receiverId, infoData);
  const loginName = localStorage.getItem("username");
  return (
    <div className={styles.clearfix}>
      <div
        className={classNames({
          [styles.leftContent]: userId === receiverId,
          [styles.rightContent]: userId !== receiverId,
        })}
      >
        <div
          className={classNames({
            [styles.top]: true,
            [styles.clearfix]: true,
          })}
        >
          {<div className={styles.des}>{message}</div>}
          {/* {type === 1 && (
            <div className={styles.myImg}>
              <img src={text}></img>
            </div>
          )} */}
        </div>

        <div className={styles.myDetail}>
          <div className={styles.icon}>
            <Avatar src={require(`@/assets/img/head_portrait_ki.jpg`)} />
          </div>
          <div className={styles.name}>{name}</div>
          <div className={styles.time}>{time}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(PersonItem);
PersonItem.displayName = "PersonItem";
