"use client";

import axios from "axios";
import { Question } from "../context/number";
import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../context/firebaseConfig";

const auth = getAuth(app);

const OptionDay = ({ ans }) => {
  let data = useContext(Question);

  const [showAns, setShowAnsewer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // To track the selected option
  const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct or not
  const [user, setUser] = useState(null); // State to store the authenticated user

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when they are authenticated
      } else {
        setUser(null); // Handle unauthenticated state
      }
    });

    // Cleanup the listener when the component unmounts
  }, []);

  const checkAnswer = async (index) => {
    setSelectedOption(index);
    if (index === parseInt(ans)) {
      setIsCorrect(true);

      console.log("Answer correct");

      await axios.post("/api/right", { email: user.email });
    } else {
      setIsCorrect(false);

      // Send the attempt information to the backend
      await axios.post("/api/attempt", { email: user.email });
    }
  };

  const getOptionStyle = (index) => {
    if (selectedOption === null) return "border-blue-500 text-blue-500";
    if (index === selectedOption) {
      return isCorrect
        ? "border-green-500 bg-green-500 text-blue"
        : "border-red-500 bg-red-500 text-blue";
    }
    return "border-blue-500 text-blue-500";
  };

  return (
    <div className="flex flex-row justify-between  px-2 w-full gap-4 mt-2 h-fit">
      <div className="flex flex-row justify-center  gap-2">
        {["A", "B", "C", "D"].map((label, idx) => (
          <div
            key={label}
            onClick={() => checkAnswer(idx + 1)}
            className={`border-2 px-10 py-2 active:scale-95 self-center duration-100 transition-all rounded-lg bg-transparent text-center font-bold ${getOptionStyle(
              idx + 1
            )}`}>
            {label}
          </div>
        ))}
      </div>
      <div
        className={`bg-blue-500 rounded-xl active:scale-95 duration-100 ${
          showAns ? "opacity-0" : undefined
        } transition-all px-8 py-4 text-white w-fit`}
        onClick={() => {
          setShowAnsewer((prev) => !prev);
        }}>
        Show Answer
      </div>
      {showAns ? (
        <>
          <p className="text-green-500 text2xl font-bold">
            {ans == 4 ? "D" : undefined} {ans == 3 ? "C" : undefined}
            {ans == 2 ? "B" : undefined}
            {ans == 1 ? "A" : undefined}
          </p>
        </>
      ) : undefined}
    </div>
  );
};

export default OptionDay;
