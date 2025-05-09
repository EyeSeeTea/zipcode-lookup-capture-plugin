import React from "react";
import { Message } from "../domain/entities/Message";

type Props = Message;

export const MessageBox = ({ type, text }: Props) => {
  // color values taken from capture app
  const backgroundColor =
    type === "error" ? "#ffe5e8" : type === "warning" ? "#ffecb3" : "inherit";
  const color =
    type === "error" ? "#c62828" : type === "warning" ? "#bb460d" : "inherit";
  return (
    <div
      className="flex items-center px-2 mr-5 h-full"
      style={{ backgroundColor, color }}
    >
      {text}
    </div>
  );
};
