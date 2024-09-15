import React from "react";
import Section from "../../../component/Card";
import Link from "next/link";

export default function Jeepage() {
  return (
    <>
      <div className="md:flex  justify-around ">
        <Link href="/jee/phy">
          <Section subject_name="Physics" logo="physics logo.jpg"></Section>
        </Link>
        <Link href="/jee/chem">
          {" "}
          <Section subject_name="Chemistry" logo="chem logo.jpg"></Section>{" "}
        </Link>
        <Link href="/jee/maths">
          {" "}
          <Section subject_name="Maths" logo="maths image.jpeg"></Section>{" "}
        </Link>
      </div>
    </>
  );
}
