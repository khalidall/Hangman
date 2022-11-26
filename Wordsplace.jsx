import React from "react";

export default function Wordsplace({ randomWord }) {
  let values = randomWord.map((e, i) => (
    <span className="character" key={i}>
      {randomWord[i]}
    </span>
  ));
  return <div className="word-place">{values}</div>;
}
