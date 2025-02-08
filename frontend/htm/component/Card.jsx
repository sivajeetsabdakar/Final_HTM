"use client";
import Card from "react-animated-3d-card";
const SubjectCard = ({ imageurl, subject_name, logo }) => {
  return (
    <Card
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        width: "450px",
        height: "300px",
        cursor: "pointer",
      }}
    >
      <div>
        {imageurl ? (
          <img
            style={{
              position: "absolute",
              left: "25px",
              top: "25px",
              height: "50px",
              width: "60px",
            }}
            src={imageurl}
            className="card-item__chip"
            alt="credit card chip"
          ></img>
        ) : null}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontFamily: "Fira Code",
            color: "white",
          }}
        >
          <label style={{ marginLeft: "30px" }} className="text-6xl ">
            {subject_name}
          </label>
        </div>
        <img className="h-52" src={logo}></img>
      </div>
    </Card>
  );
};
const Section = ({ imageurl, subject_name, logo }) => {
  return (
    <div
      style={{
        height: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="mx min-w-2 "
    >
      <SubjectCard
        imageurl={imageurl}
        subject_name={subject_name}
        logo={logo}
      />
    </div>
  );
};

export default Section;
