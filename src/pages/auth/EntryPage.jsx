import { Link } from "react-router-dom";

import React from "react";

export default function EntryPage() {
  return (
    <div className="vh-100 d-flex flex-column p-2">
      <div className="flex-grow-1">
        <div className="h-25 d-flex align-items-end">
          <div
            className="w-100 text-center font-bilbo"
            style={{ fontSize: 36 }}
          >
            async
          </div>
        </div>
        <div className="h-75 d-flex justify-content-center">
          <div className="font-bilbo w-50 text-center" style={{ fontSize: 96 }}>
            tic tac toe
          </div>
        </div>
      </div>
      <div className="d-grid gap-4 pb-4">
        <Link className="btn btn-warning btn-lg" to="/login">
          Login
        </Link>
        <Link className="btn btn-primary btn-lg" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
