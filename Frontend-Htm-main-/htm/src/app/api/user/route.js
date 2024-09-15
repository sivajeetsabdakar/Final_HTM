import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/Model/user";

export async function POST(req) {
  try {
    await dbConnect();
    
    // Parse request body
    const { email } = await req.json();
    console.log("Received email:", email);

    // Check if user exists
    const checkUser = await User.find({ email: email });

    if (checkUser.length > 0) {
      console.log("User already exists");
      return NextResponse.json({ message: "User already exists", user: checkUser });
    } else if (email) {
      // Create new user
      const newUser = new User({
        email: email,
        totalQuestion: 0,
        right: 0,
      });

      await newUser.save();
      const user = await User.find({ email: email });
      console.log("New user created:", user);

      return NextResponse.json({ message: "New user created", user: user });
    } else {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
