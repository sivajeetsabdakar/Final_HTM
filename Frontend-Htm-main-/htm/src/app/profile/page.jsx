"use client";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../context/firebaseConfig";
import axios from "axios";
import Button from "@mui/material/Button";
import { Loader2 } from "lucide-react"; // Use a loader icon from Lucide

const auth = getAuth(app);

export default function ProfilePage() {
  const [data, setData] = useState(null); // Initially set to null to represent loading state
  const [user, setUser] = useState(null); // Initially set to null for the same reason
  const [loading, setLoading] = useState(true); // New loading state

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Authentication check completed
    });

    // Cleanup listener on unmount
  }, []);

  // Fetch data from the API when user is authenticated
  useEffect(() => {
    if (user) {
      console.log("error can ");
      const fetchData = async () => {
        try {
          const result = await axios.post("/api/user", { email: user.email });
          console.log("response success");

          setData(result.data); // Assuming response is already in JSON format
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };

      fetchData();
    }
  }, [user]);
  console.log(data);

  // Display loader while waiting for both user authentication and data fetching
  if (loading || !user || !data) {
    return (
      <div className="w-screen flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-600 w-12 h-12 align-middle" />
      </div>
    );
  }

  // Once the user is authenticated and data is fetched, display the profile page
  return (
    <div className="flex h-fit">
      <div
        id="profile-info"
        className="max-w-96 min-w-96 box-border pt-6 bg-slate rounded-2xl mt-24 bg-slate-900 ml-5">
        <div id="user-info" className="flex items-center gap-x-4">
          <div>
            <img
              src={user.photoURL}
              alt="User Profile"
              className="ml-7 rounded-3xl"
            />
          </div>
          <div>
            <h1 className="text-white text-lg">{user.displayName}</h1>
          </div>
        </div>
        <h1 className="ml-7 mt-5">
          Jenil Parmar is a 2nd-year BTech student at IIIT Vadodara,Highly passionate
          about web development, machine learning, and mobile app development.
          With a very strong foundation in technologies like Next.js, Flask, and
          Flutter, Jenil has worked on various innovative projects, including a
          women safety app and a crime reporting platform. Always eager to learn
          and apply new skills, Jenil is focused on using technology to make a
          positive impact, especially in rural healthcare and safety
          applications.
          <br />
        </h1>
      </div>
      <div
        id="q-Data"
        className="w-full h-full overflow-y-hidden py-10 justify-center gap-2 flex flex-col -gap-5 px-5 box-border pt-6 bg-slate rounded-2xl mt-24 bg-slate-900 ml-5 mr-5">
      <div className="self-center -m-6">
      <p className="text-gray-600 text-3xl font-bold self-center mt-10 mb-4">Look Where You Stand</p>

      </div>
        <div className="flex flex-row justify-around w-full ">
        <h1 className="text-center   text-4xl mt-16 w-4/12 pt-5 bg-slate-800 border-[0.1vh] rounded-xl  transition-shadow duration-250 px-4  border-white "  >
          Questions attempted:{" "}
          <p className="text-7xl pt-4 text-white font-bold">
            {data.user[0]?.totalQuestion}
          </p>
          <br />
        </h1>
        <h1 className="text-center   text-4xl mt-16 w-4/12 pt-5 bg-slate-800 border-[0.1vh] rounded-xl transition-shadow duration-250 px-4  border-white "   >
         Conqured questions:{" "}
          <p className="text-7xl pt-4 text-white font-bold">
            {data.user[0]?.right}
          </p>
          <br />
        </h1>
        </div>
       <div className="flex flex-row justify-center">
       <h1 className="text-center   text-4xl mt-24 w-4/12 pt-5  bg-slate-800 border-[0.1vh] rounded-xl  transition-shadow duration-250 px-4  border-white "   >
          Setback questions:{" "}
          <p className="text-7xl pt-4 text-white font-bold">
            {data.user[0]?.totalQuestion-data.user[0]?.right}
          </p>
          <br />
        </h1>
       </div>
      </div>
    </div>
  );
}
