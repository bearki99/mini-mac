import styled from 'styled-components';
interface IWrapper {
  isActive: boolean;
}
export const ChatItemWrapper = styled.div<IWrapper>`
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .right {
    margin-left: 15px;
    div {
      padding: 5px 0;
    }
    .name {
      font-size: 16px;
    }
  }
  .info {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 80px;
    padding: 10px 20px;
    border-radius: 10px;
    .icon {
      position: relative;
      width: 50px;
      height: 50px;
      border: 2px solid rgb(255, 255, 255);
      border-radius: 50%;
      &::before {
        position: absolute;
        right: 0;
        z-index: 1;
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        content: '';
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        box-sizing: border-box;
        width: 45px;
        height: 45px;
        vertical-align: middle;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .activeCard {
    background-color: #1d90f5;
    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
    transition: 0.3s;
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
  img {
  }
`;
