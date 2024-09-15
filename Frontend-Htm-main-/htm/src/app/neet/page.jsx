import React from "react";
import Section from "../../../component/Card";
import Link from "next/link";

export default function Neetpage() {
  return (
    <>
      <div className="md:flex  justify-around ">
        <Link href="/neet/phy">
          <Section subject_name="Physics" logo="physics logo.jpg"></Section>
        </Link>
        <Link href="/neet/chem">
          {" "}
          <Section subject_name="Chemistry" logo="chem logo.jpg"></Section>{" "}
        </Link>
        <Link href="/neet/bio">
          {" "}
          <Section subject_name="Biology" logo="bio image.jpeg"></Section>{" "}
        </Link>
      </div>
    </>
  );
}
