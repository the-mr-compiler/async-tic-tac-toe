import React from "react";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="sticky-top h1 bg-white pb-2">
      {"<"}
    </div>
  );
}
