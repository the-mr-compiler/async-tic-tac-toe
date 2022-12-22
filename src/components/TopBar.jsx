import React from "react";
import { useNavigate } from "react-router-dom";

import back from "../assets/back.svg";
export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="sticky-top h1 bg-white pb-2">
      <img src={back} alt="<" className="cursor-pointer" />
    </div>
  );
}
