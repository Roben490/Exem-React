import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <p>Created by Reuven Dagaga&copy; {new Date().getFullYear()}</p>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
    </footer>
  );
}
