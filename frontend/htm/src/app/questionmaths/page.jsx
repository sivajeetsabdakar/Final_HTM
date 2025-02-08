"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import QuestionComp from "../../../component/QuestionComp";

const Page = () => {
  const [paragraph, setParagraph] = useState("");
  const [response, setResponse] = useState({ ans: [], quetion_Image: [] });
  const [imageStetus, setImageStetus] = useState("Add Image");
  const [base64String, setBase64String] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Strings = reader.result;
        setBase64String(base64Strings);
        console.log("Base64 string:", base64Strings);
      };
      reader.readAsDataURL(file);
      setImageStetus("Image Atteched");
    }
  };

  const handleAddImageClick = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageSubmit = async () => {
    const data = {
      Subject: "Jp",
      ImageBase64String: base64String,
    };
    try {
      const res = await axios.post("http://127.0.0.1:5000/Text_extract", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setResponse(res.data.result || {});
    } catch (error) {
      console.error("Error sending paragraph:", error);
      setResponse({ ans: [], quetion_Image: [] });
    }
  };
  const handleSubmit = async () => {
    try {
      const data = { paragraph: paragraph };
      const res = await axios.post("http://127.0.0.1:5000/Jee_Maths", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.result);
      setResponse(res.data.result || {});
    } catch (error) {
      console.error("Error sending paragraph:", error);
      setResponse({ ans: [], quetion_Image: [] });
    }
  };

  return (
    <div className="h-fit w-screen text-black bg-transparent justify-start flex flex-col">
      <div className="w-10/12 h-fit py-20 self-center mt-20 flex flex-col">
        <div className="flex flex-row self-center gap-2">
          <div className="self-center">
            <p
              className="p-2 px-4 bg-transparent border-2 rounded-lg border-blue-500 my-4 text-blue-500 font-bold w-fit cursor-pointer"
              onClick={handleAddImageClick} // Add the click event to trigger file input
            >
              {imageStetus}
            </p>
          </div>

          <input
            type="file"
            name="image"
            id="image"
            hidden
            ref={fileInputRef} // Attach the ref to the input
            onChange={handleFileChange}
          />
          <button
            onClick={handleImageSubmit}
            className="bg-blue-500 rounded-lg text-white font-semibold p-2 px-4 self-center">
            Submit
          </button>
        </div>
        <textarea
          name="inputQuestion"
          id="inputQuestion"
          onChange={(e) => setParagraph(e.target.value)}
          className="bg-transparent border-2 border-blue-500 self-center text-white p-2"
          placeholder={"Enter Paragraph Here...."}
          cols={100}
          rows={6}></textarea>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 px-10 py-4 rounded-md text-white active:scale-95 transition-all duration-100 mt-5 w-40 self-center">
          Send
        </button>

        <div className="mt-10 flex justify-center flex-col">
          {response.ans.map((answer, index) => (
            <div key={index} className="mb-4 self-center">
              {response.quetion_Image[index] && (
                <QuestionComp
                  src={response.quetion_Image[index]}
                  index={index + 1}
                  ans={answer}
                  flag={answer.slice(0, 1) === "I" ? false : true} // Check the first character of the answer
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
