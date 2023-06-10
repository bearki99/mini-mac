import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./index.module.css";
interface IProps {
  children?: ReactNode;
  handleEmoji?: any;
}

const Emoji: React.FC<IProps> = (props) => {
  const { handleEmoji } = props;
  const emojiItem = [
    require("@/assets/img/emoji/slightly-smiling-face.png"),
    require("@/assets/img/emoji/smiling-face.png"),
    require("@/assets/img/emoji/smiling-face-with-heart-eyes.png"),
    require("@/assets/img/emoji/smiling-face-with-sunglasses.png"),
    require("@/assets/img/emoji/thinking-face.png"),
    require("@/assets/img/emoji/tired-face.png"),
    require("@/assets/img/emoji/money-mouth-face.png"),
    require("@/assets/img/emoji/loudly-crying-face.png"),
    require("@/assets/img/emoji/pouting-face.png"),
    require("@/assets/img/emoji/face-screaming-in-fear.png"),
    require("@/assets/img/emoji/face-vomiting.png"),
    require("@/assets/img/emoji/face-without-mouth.png"),
    require("@/assets/img/emoji/face-with-tongue.png"),
    require("@/assets/img/emoji/clown-face.png"),
    require("@/assets/img/emoji/new-moon-face.png"),
    require("@/assets/img/emoji/ghost.png"),
    require("@/assets/img/emoji/jack-o-lantern.png"),
    require("@/assets/img/emoji/money-bag.png"),
    require("@/assets/img/emoji/pile-of-poo.png"),
    require("@/assets/img/emoji/shamrock.png"),
    require("@/assets/img/emoji/hibiscus.png"),
    require("@/assets/img/emoji/lips.png"),
    require("@/assets/img/emoji/sparkles.png"),
    require("@/assets/img/emoji/star.png"),
    require("@/assets/img/emoji/two-hearts.png"),
    require("@/assets/img/emoji/rainbow.png"),
    require("@/assets/img/emoji/thought-balloon.png"),
  ];
  const handleClick = function (item: string) {
    handleEmoji(item);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.emojiContent}>
        {emojiItem &&
          emojiItem.map((item: string) => {
            return (
              <div
                className={styles.emojiItem}
                key={item}
                onClick={() => handleClick(item)}
              >
                <img src={item} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default memo(Emoji);
