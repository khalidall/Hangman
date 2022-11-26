import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Clavie from "./Clavie";
import Image from "./Image";
import Wordsplace from "./Wordsplace";
import Result from "./Result";
import Worddescription from "./Worddescription";

export default function Hangman() {
  const [description, setDescription] = useState("");
  const [imgNumber, setImgNumber] = useState(0);
  const [randomWord, setRandomWord] = useState("");
  const [placedWord, setPlacedWord] = useState(
    Array.from(randomWord).map((e) => "_")
  );
  const [reset, setReset] = useState(false);

  function handleReplay() {
    setImgNumber(0);
    setReset(!reset)
  }

  function handleKey(e) {
    let key = e.target.innerHTML;
    if (imgNumber < 6 && placedWord.includes("_")) {
      let indexs = [];
      Array.from(randomWord).forEach((e, i) => {
        if (key === e) {
          indexs.push(i);
        }
      });
      if (randomWord.includes(key)) {
        return setPlacedWord((old) => {
          let newRan = old.map((e, i) => {
            for (let index of indexs) {
              if (i === index) {
                e = key;
                setRandomWord((oldValue) => {
                  let modifiedWord = Array.from(oldValue).map((char, ind) => {
                    if (index === ind) {
                      char = "_";
                      return char;
                    }
                    return char;
                  });
                  return modifiedWord.join("");
                });
              }
            }
            return e;
          });
          return newRan;
        });
      } else {
        setImgNumber((oldValue) => oldValue + 1);
      }
    }
  }
  console.log("It's Rendered")
  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word")
      .then((res) => res.json())
      .then((data) => {
        setPlacedWord((oldValue) => Array.from(data[0]).map((e) => "_"));
        setRandomWord(data[0]);
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data[0]}`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)){
              setDescription(data[0].meanings[0].definitions[0].definition);
            }else {
              setDescription(data.title)
            }
          });
      });
  }, [reset]);
  function handleReset() {
    setReset(!reset);
    setImgNumber(0);
  }
  return (
    <div className="game-container">
      <Image imgNumber={imgNumber} />
      <Worddescription description={description} />
      <Clavie
        sendKey={handleKey}
        handleReset={handleReset}
      />
      <Wordsplace randomWord={placedWord} />
      {imgNumber === 6 && <Result handleReplay={handleReplay} msg={"Lost"} />}
      {!placedWord.includes("_") && <Result handleReplay={handleReplay} msg={"Won"} />}
    </div>
  );
}
