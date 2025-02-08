"use client";
import Image from "next/image";
import React, { useState } from "react";
import Option from "./Option";
import axios from "axios";
import { stringify } from "postcss";

const QC = ({ imageSrc, ans, index, shift }) => {
  const [textAnswer, setTextAnswer] = useState(""); // State for the text input
  const [showAns, setShowAns] = useState(false);

  return (
    <div className="mt-5 w-full px-10 h-fit py-10 flex flex-col justify-center">
      <Image src={imageSrc} width={850} height={550} alt="Question image" />
      {
      
      (""+ans).slice(0, 1) =="I" ? (
        <>
          <div className="flex flex-row gap-6">
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="border p-2 rounded-md mt-4"
            />
            <button
              onClick={() => {
                if (ans === "I" + textAnswer) {
                  alert("ha");
                } else {
                  alert("na");
                }
              }}
              className="bg-blue-500 text-white p-2 rounded-md mt-2">
              Submit
            </button>
            <button
              className={`bg-blue-500 px-8 py-4 rounded-xl text-white`}
              onClick={() => {
                setShowAns((prev) => !prev);
              }}>
              {showAns ? "Hide Answer" : "Show Answer"}
            </button>
          {showAns && (
            <p className="text-green-500 text-2xl font-bold mt-4">
            {ans.slice(1)}
            </p>
          )}
          </div>
        </>
      ) : (
        <center>
          <Option ans={ans} question={index} shift={shift} />
        </center>
      )}
    </div>
  );
};

export default QC;
