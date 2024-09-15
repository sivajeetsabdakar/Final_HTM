import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/Model/user";

export async function POST(req) {
  await dbConnect();

  let email = await req.json();
  // console.log("email from db");

  let user = await User.find(email);

  return NextResponse.json({ ques: 0 });
}
