import React, { ReactNode } from "react";
import { memo } from "react";
import { Avatar } from "antd";
import classNames from "classnames";

import styles from './style.module.css'
interface IProps {
  children?: ReactNode;
  infoData?: any;
  type: number;
}

const PersonItem: React.FC<IProps> = (props) => {
  const { infoData, type } = props;
  const { text, name, time } = infoData;
  const loginName = localStorage.getItem("username");
  return (
    <div className={styles.clearfix}>
      <div
        className={classNames({
          [styles.leftContent]: loginName !== name,
          [styles.rightContent]: loginName === name,
        })}
      >
        <div className={classNames({
          [styles.top]: true,
          [styles.clearfix]: true,
        })}>
          {type === 0 && <div className={styles.des}>{text}</div>}
          {type === 1 && (
            <div className={styles.myImg}>
              <img src={text}></img>
            </div>
          )}
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
