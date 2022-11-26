import React from "react";
import Key from "./Key";

export default function Clavie({ sendKey, handleReset }) {
  const alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  function handleClick(key) {
    sendKey(key);
  }
  return (
    <div className="clavie-container">
      {alpha.map((e, i) => {
        return (
          <Key
            keyStrock={e}
            key={i}
            handleClick={handleClick}
          />
        );
      })}
      <button onClick={handleReset} className="handleReset">
        <i className="fa-solid fa-repeat"></i>
      </button>
    </div>
  );
}
