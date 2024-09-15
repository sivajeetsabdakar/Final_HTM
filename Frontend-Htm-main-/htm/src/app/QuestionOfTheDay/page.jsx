"use client";
import axios from "axios";
import React, { useState } from "react";
import QuestionComp from "../../../component/QuestionComp";
import Button from "@mui/material/Button";

const Page = () => {
  const [jres, setJRes] = useState(null);
  const [nres, setNres] = useState(null);

  const clearData = () => {
    setJRes(null);
    setNres(null);
  };

  const jgetData = async () => {
    clearData(); // Clear previous data when JEE button is clicked
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get-questions?examType=jee"
      );
      setJRes(response.data);
    } catch (error) {
      console.error("Error fetching JEE data:", error);
    }
  };

  const ngetData = async () => {
    clearData(); // Clear previous data when NEET button is clicked
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get-questions?examType=neet"
      );
      setNres(response.data);
    } catch (error) {
      console.error("Error fetching NEET data:", error);
    }
  };

  const res = jres || nres;

  return (
    <div className="h-fit py-10 w-full mt-10 bg-transparent flex flex-col">
      <div className="flex flex-row justify-center">
        <Button
          variant="contained"
          style={{ marginRight: "30px" }}
          onClick={jgetData}
        >
          JEE
        </Button>
        <Button variant="contained" onClick={ngetData}>
          NEET
        </Button>
      </div>

      {res &&
        res.questions &&
        res.questions.map((src, index) => (
          <div key={index} className="self-center flex flex-col h-fit w-fit">
            <QuestionComp
              src={src}
              index={index + 1}
              ans={res.solutions[index]}
              flag={res.solutions[index].slice(0, 1) === "I" ? false : true}
            />
            <br />
          </div>
        ))}
    </div>
  );
};

export default Page;
