/* eslint-disable react-hooks/exhaustive-deps */
import { useAppsStore, useTerminalStore } from "@/store";
import React, { ReactNode, useState, useEffect } from "react";
import { memo } from "react";
import { generateRandomString } from "@/utils";
import { Row, Help, CommandNotFound } from "./utils";
import { TerminalData } from "@/lib/type";
import { FolderStructure } from "./data";
interface IProps {
  children?: ReactNode;
}
interface CommandList {
  [key: string]: { (): void } | { (arg: string | TerminalData): void };
}

const Terminal: React.FC<IProps> = () => {
  const [currentId, setCurrentId, resetCurrentId] = useTerminalStore((s) => [
    s.currentId,
    s.setCurrentId,
    s.resetCurrentId,
  ]);
  const [openApp, closeApp] = useAppsStore((s) => [s.openApp, s.closeApp]);

  const [changeCount, setChangeCount] = useState(0);
  const [currentDirectory, setCurrentDirectory] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [content, setContent] = useState<JSX.Element[]>([
    <Row
      key={generateRandomString()}
      id={0}
      currentDirectory={currentDirectory}
      onkeydown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        executeCommand(e, 0)
      }
    />,
  ]);
  const [targetFolder, setTargetFolder] =
    useState<TerminalData>(FolderStructure);

  function clickToFocus(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const currentInput = document.querySelector(
      `#terminal-input-${currentId}`
    ) as HTMLInputElement;
    currentInput.focus();
  }

  function handleArrowUp() {
    setChangeCount((prev) => {
      return Math.max(prev - 1, -commandHistory.length);
    });
  }

  function handleArrowDown() {
    setChangeCount((prev) => Math.min(prev + 1, 0));
  }

  function matchCommand(str: string): string | null {
    const matchedCommands = commandHistory.filter((command) =>
      command.startsWith(str)
    );
    return matchedCommands.length > 0
      ? matchedCommands[matchedCommands.length - 1]
      : null;
  }

  function generateRow(row: JSX.Element) {
    setContent((s) => [...s, row]);
  }

  function clear() {
    setContent([]);
    const input = document.querySelector(
      "#terminal-input-0"
    ) as HTMLInputElement;
    input.value = "";
  }

  function open(arg = "") {
    generateRow(<div key={generateRandomString()}>Opening {arg}...</div>);
    openApp(arg);
  }

  function close(arg = "") {
    closeApp(arg);
    generateRow(<div key={generateRandomString()}>Closed {arg}...</div>);
  }

  const commandList: CommandList = {
    clear,
    help: () => generateRow(<Help key={generateRandomString()} />),
    open,
    close,
    // ls,
    // cd,
    // cat,
    // apps,
  };

  function executeCommand(
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) {
    const input = document.querySelector(
      `#terminal-input-${id}`
    ) as HTMLInputElement;
    const [cmd, args] = input.value.trim().split(" ");
    const key = e.key;
    if (key === "ArrowUp") handleArrowUp();
    else if (key === "ArrowDown") handleArrowDown();
    else if (key === "Tab") {
      e.preventDefault();
      const matchedCommand = matchCommand(input.value.trim());
      if (matchedCommand) {
        input.value = matchedCommand;
      }
    } else if (key === "Enter") {
      const newArr = commandHistory;
      newArr.push(input.value.trim());
      setCommandHistory(newArr);
      if (cmd && Object.keys(commandList).includes(cmd)) {
        commandList[cmd](args);
      } else if (cmd !== "") {
        generateRow(
          <CommandNotFound
            key={generateRandomString()}
            command={input.value.trim()}
          ></CommandNotFound>
        );
      }
      generateRow(
        <Row
          key={generateRandomString()}
          id={commandHistory.length}
          onkeydown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            executeCommand(e, commandHistory.length)
          }
          currentDirectory={currentDirectory}
        />
      );
      setCurrentId(1);
    }
  }

  useEffect(() => {
    resetCurrentId();
  }, []);

  useEffect(() => {
    const input = document.querySelector(
      `#terminal-input-${commandHistory.length}`
    ) as HTMLInputElement;
    if (commandHistory.length && input) {
      input.value = commandHistory[commandHistory.length + changeCount];
    }
    if (!changeCount && input) {
      input.value = "";
      setChangeCount(0);
    }
  }, [changeCount]);
  return (
    <div
      className="p-4 pr-[5px] h-full text-white bg-[#1C1C1E]/95 rounded-lg"
      style={{
        fontFamily: "Menlo, monospace",
        fontSize: "14px",
        minHeight: "300px",
      }}
    >
      <div className="h-6 rounded-lg"></div>
      <div className="flex flex-col w-full h-[400px] overflow-y-scroll mb-2 chatlist_">
        <div>Welcome to Mac,type `help` to get started, have fun!</div>
        <div className="flex-1 w-full" onClick={(e) => clickToFocus(e)}>
          {content}
        </div>
      </div>
    </div>
  );
};
export default memo(Terminal);
Terminal.displayName = "Terminal";
