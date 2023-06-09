import styled from 'styled-components';

export const MineWrapper = styled.div`
  width: 100vw;
  height: 85vh;
  background-color: rgb(151, 157, 167);
  .chatHome {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    box-sizing: border-box;
    width: 90vw;
    height: 75vh;
    padding: 10px;
    background-color: rgb(39, 42, 55);
    border-radius: 15px;
    transform: translate(-50%, -50%);
    .chatLeft {
      box-sizing: border-box;
      padding-left: 20px;
      width: 280px;
      .title {
        padding-bottom: 10px;
      }
      .title h1 {
        padding: 0;
        margin: 0;
        color: white;
      }
      .chatList {
        color: white;
        .list-name {
          margin: 20px 0;
          color: rgb(176, 178, 189);
        }
      }
    }
    .chatRight {
      flex: 1;
    }
  }
`;
