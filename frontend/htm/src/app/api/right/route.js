import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/Model/user";

// POST request to update the user's totalQuestion
export async function POST(req) {
  // Connect to the database
  await dbConnect();

  // Parse the request body to get the email
  const { email } = await req.json(); // Make sure the request body has a JSON object with the "email"

  // Find the user by email and update the totalQuestion field
  try {
    // Use `findOneAndUpdate` to find the user and increment the totalQuestion
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Find user by email
      { $inc: { right: 1 } }, // Increment the totalQuestion field by 1
      { new: true } // Return the updated document
    );

    // If user is not found, return an error response
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the updated user as a response
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    // If there is an error, return a server error response
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
