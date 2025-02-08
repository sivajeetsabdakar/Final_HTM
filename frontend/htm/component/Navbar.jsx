"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../context/firebaseConfig";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import Profile from "./profile";
import Link from "next/link";

let auth = getAuth(app);
console.log("aut:h ");
export default function Navbar() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });
  let [user, setUser] = useState(null);
  console.log("rendefgfgr");

  return (
    <>
      <div className=" navbar bg-base-100 fixed z-10 top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/"> Home</Link>
              </li>
              <li>
                <Link href="/explore">Explore</Link>
              </li>
              <li>
                <a>Discuss</a>
              </li>
              <li>
                <Link href="/QuestionOfTheDay">Question me</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            Class <span className="text-red-300">Buddy</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/"> Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
            </li>
            <li>
              <a href="https://studybuddie.streamlit.app/">Vision  Buddy</a>
             
            </li>
            <li> <a href="https://lemmebuildstudybuddy.streamlit.app/">Smart Buddy</a></li>
            <li>
              <Link href="/QuestionOfTheDay">Question me</Link>
            </li>
          </ul>
        </div>
        <Profile></Profile>
      </div>
    </>
  );
}
