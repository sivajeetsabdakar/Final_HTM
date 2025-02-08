"use client";
import React, { useState } from "react";
import QuestionComp from "../../../component/QuestionComp";

const Page = () => {
  const [paragraph, setParagraph] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  
  // Initialize response state with empty arrays for ans and question_Image
  const [response, setResponse] = useState({ ans: [], quetion_Image: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/Jee_Physics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: paragraph }),
      });

      console.log("Response received:", response);

      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setMessage("");

        // Update response state with ans and question_Image extracted from data.suggestions
        setResponse({
          ans: data.suggestions.map((s) => s.ans),
          quetion_Image: data.suggestions.map((s) => s.image),
        });
      } else {
        setSuggestions([]);
        setMessage(data.message || "No related data found");
        setResponse({ ans: [], quetion_Image: [] }); // Reset response state if no suggestions
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setMessage("An error occurred while fetching suggestions.");
      setResponse({ ans: [], quetion_Image: [] }); // Reset response state in case of error
    }
  };

  return (
    <div className="h-fit w-screen text-black bg-transparent justify-start flex flex-col">
      <div className="w-10/12 h-fit py-20 self-center mt-20 flex flex-col">
        <textarea
          name="inputQuestion"
          id="inputQuestion"
          onChange={(e) => setParagraph(e.target.value)}
          className="bg-transparent border-2 border-blue-500 self-center text-white p-2"
          placeholder={"Enter Paragraph Here...."}
          cols={100}
          rows={6}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 px-10 py-4 rounded-md text-white active:scale-95 transition-all duration-100 mt-5 w-40 self-center"
        >
          Send
        </button>

        {/* Display response using QuestionComp */}
        <div className="mt-10 flex justify-center flex-col">
          {response.ans.map((answer, index) => (
            <div key={index} className="mb-4 self-center">
              {response.quetion_Image[index] && (
                <QuestionComp
                  src={response.quetion_Image[index]}
                  index={index + 1}
                  ans={answer}
                  flag={answer.slice(0, 1) === "I" ? false : true}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
