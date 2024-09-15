"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Uploadfile({ subj }) {
  let router = useRouter();
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");
  const inputRef = useRef();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    setFile(selectedFile); // Set the file state
    convertToBase64(selectedFile); // Convert file to Base64
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as Data URL (Base64)
      reader.onload = () => {
        setBase64(reader.result); // Set Base64 string to state
        resolve(reader.result); // Resolve with Base64 string
      };
      reader.onerror = (error) => reject(error); // Reject on error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitted");
      
      let response = await axios.post("http://127.0.0.1:5000/Text_extract", {
        "ImageBase64String": base64,
        "Subject": subj,
      });
      console.log("---data for neet "+JSON.stringify(response));
  
      // Navigate to another page after submission with query params
      localStorage.setItem("responseData", JSON.stringify(response.data));

      router.push(
        !(subj==="Jm")?`/questions`:`/qmaths`
      ); // Replace with actual path if needed
    } catch (error) {
      console.error("Error submitting file:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Paragraph of Book</h1>
        <div className="flex justify-center ">
          <img
            src="/book.png"
            alt="Book"
            onClick={focusInput}
            className="cursor-pointer h-24"
          />
        </div>
        <input
          type="file"
          name="file"
          className="hidden"
          ref={inputRef}
          accept="image/*" // Optional: to restrict to image files
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
