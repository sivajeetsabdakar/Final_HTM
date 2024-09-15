import Image from "next/image";
import React, { useState } from "react";
import Option from "./Option";
import OptionDay from "../component/questionoftheday";
const QuestionComp = ({ src, flag = true, index, ans }) => {
  const [integerAnswer, setIntegerAnswer] = useState("1");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const checkInteger = (num, ans) => {
    if (ans === "I" + num) {
      setAttempted(true);
      setCorrectAnswer(true);
    } else {
      setAttempted(true);
      setCorrectAnswer(false);
    }
  };

  return (
    <div className="self-center w-fit px-10 h-fit py-2 flex flex-col">
      <p className="text-white p-2 font-semibold text-xl">
        {index} {")."}
      </p>
      <Image src={src} width={750} height={200} />
      <div className="flex flex-row justify-between mt-2">
        {flag ? (
          <OptionDay ans={ans} />
        ) : (
          <>
            <input
              type="number"
              onChange={(e) => setIntegerAnswer(e.target.value)}
              className={`bg-transparent py-2 ml-5 placeholder:text-white rounded-md border-2 ${
                attempted
                  ? correctAnswer
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-blue-500"
              } text-white font-bold px-4`}
              placeholder="Enter Integer"
            />
            <button
              onClick={() => checkInteger(integerAnswer, ans)}
              className={`${
                attempted
                  ? correctAnswer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500"
              } px-10 py-2 rounded-md text-white active:scale-95 transition-all duration-100 w-32 self-center`}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionComp;
