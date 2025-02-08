"use client"; // This should be the first line to indicate a client component
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Loader2 } from "lucide-react"; // Use a loader icon from Lucide
import Option from "../../../component/Option";
import { app } from "../../../context/firebaseConfig";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Quest() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to access query params
  const auth = getAuth(app);
  const [user, setUser] = useState(null); // State to hold user
  const [flag, setFlag] = useState(false);
  const [integerAnswer, setIntegerAnswer] = useState("1");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [arr, setArr] = useState([]); // Questions array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question index

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("---> User Email: ", currentUser?.email);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [auth]);

  // Fetch questions from Flask backend
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.post("/api/flask-endpoint", { paragraph: "your_paragraph_here" });
        const data = response.data;
        if (data && Array.isArray(data.quetion_Image)) {
          setArr(data); // Store questions in state
        } else {
          console.error("Invalid data format from Flask");
        }
      } catch (error) {
        console.error("Error fetching data from Flask:", error);
      }
    }

    fetchQuestions(); // Call the async function
  }, []); // Fetch on component mount

  // Access questions, images, and solutions from arr
  const questions = arr.quetion_Image || []; // Extract question images
  const solutions = arr.ans || []; // Extract answers

  // Handler function for integer answer check
  const checkInteger = async (num, ans) => {
    if (ans === "I" + num) {
      setAttempted(true);
      setCorrectAnswer(true);
      if (user) {
        await axios.post("/api/right", { email: user.email });
      }
      setTimeout(() => {
        moveToNextQuestion(); // Move to the next question after a correct answer
      }, 700);
    } else {
      setAttempted(true);
      setCorrectAnswer(false);
      if (user) {
        await axios.post("/api/attempt", { email: user.email });
      }
    }
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    setAttempted(false);
    setCorrectAnswer(false);
    setIntegerAnswer("1");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Go to next question
    } else {
      alert("You have completed all the questions!"); // Handle end of quiz
    }
  };

  return (
    <div className="mt-80">
      <div className="flex justify-center">
        {questions.length > 0 ? (
          <div key={currentQuestionIndex} className="h-52 w-1/2 p-2">
            {/* Set white background and padding */}
            <div className="w-full h-full flex justify-center flex-col">
              <Image
                src={`${questions[currentQuestionIndex]}`}
                alt={`Question ${currentQuestionIndex + 1}`}
                width={850}
                height={650}
              />

              {/* Check if the current question is an integer type */}
              {solutions[currentQuestionIndex]?.slice(0, 1) === "I" ? (
                <div className="flex flex-row justify-between px-5">
                  <input
                    type="number"
                    value={integerAnswer}
                    onChange={(e) => setIntegerAnswer(e.target.value)}
                    className={`bg-transparent mt-4 py-2 ml-5 w-36 placeholder:text-white rounded-md border-2 ${
                      attempted
                        ? correctAnswer
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-blue-500"
                    } text-white font-bold px-4`}
                    placeholder="Enter Integer"
                  />
                  <button
                    onClick={() =>
                      checkInteger(
                        integerAnswer,
                        solutions[currentQuestionIndex]
                      )
                    }
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
                </div>
              ) : (
                <Option
                  ans={solutions[currentQuestionIndex]}
                  question={currentQuestionIndex}
                  shift={setCurrentQuestionIndex}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-screen flex justify-center">
            <Loader2 className="animate-spin text-blue-600 w-12 h-12 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
