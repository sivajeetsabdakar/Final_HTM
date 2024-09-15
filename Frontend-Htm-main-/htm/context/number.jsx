"use client";
import { Children, createContext, useContext, useState } from "react";

export const Question = createContext();

export function Number({ children }) {
  const [data, setData] = useState({ right: 0, wrong: 0, total: 0 });

  return (
    <Question.Provider value={{ data, setData }}>{children}</Question.Provider>
  );
}
