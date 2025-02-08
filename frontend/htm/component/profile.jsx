"use client";
import { useFirebase } from "../context/Firebase";
import { getAuth } from "firebase/auth";
import { app } from "../context/firebaseConfig";
import Link from "next/link";
let auth = getAuth(app);

export default function Profile() {
  let firebase = useFirebase();
  console.log(auth.currentUser);
  return (
    <div className="navbar-end">
      {auth.currentUser != null ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={auth.currentUser.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" href="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
           
            <li>
              <button
                onClick={() => {
                  firebase.logOut();
                }}
              >
                logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={firebase.signinWithGoogle}>Signin</button>
      )}
    </div>
  );
}
