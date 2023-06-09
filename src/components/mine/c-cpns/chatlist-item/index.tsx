import React, { ReactNode } from "react";
import { memo } from "react";
import { ChatItemWrapper } from "./style";
import classNames from "classnames";
interface IProps {
  children?: ReactNode;
  infoData?: any;
  activeUser: any[];
  handleMyClick?: any;
  nowUser?: string;
}

const ChatItem: React.FC<IProps> = (props) => {
  const {activeUser, infoData, handleMyClick, nowUser} = props;
  const {name, des} = infoData;
  const handleClick = function(name: string){
    handleMyClick(name);
  }
  const newActiveUser = activeUser.map((item)=>item.username);

  const isActive = newActiveUser.indexOf(name) !== -1;
  return (
    <ChatItemWrapper isActive={isActive}>
      <div
        className={classNames("info", {
          activeCard: name ===  nowUser,
        })}
        onClick={()=>handleClick(name)}
      >
        <div className="left">
          <div className="icon">
            <img src={require(`@/assets/img/head_portrait_${name}.jpg`)} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="name">{name}</div>
          <div className="des">{des}</div>
        </div>
      </div>
    </ChatItemWrapper>
  );
};
export default memo(ChatItem);
ChatItem.displayName = "ChatItem";
