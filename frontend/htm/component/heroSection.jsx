import Section from "./Card";
import Link from "next/link";
export default function Hero_section() {
  return (
    <div className="flex flex-wrap justify-around">
      <div>
        <Link href="/neet">
          {" "}
          <Section
            imageurl="https://mycareersview.com/afile/mcv14596_neet-logo.jpg"
            subject_name="NEET"
            logo="/Dr logo.webp"
          ></Section>
        </Link>
      </div>
      <div>
        <Link href="/jee">
          <Section
            imageurl="https://images.shiksha.com/mediadata/images/articles/1654055166php38xDbh.jpeg"
            subject_name="JEE"
            logo="/Eng.webp"
          ></Section>
        </Link>
      </div>
    </div>
  );
}
