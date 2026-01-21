import React from "react";
import "../styles/theme.css";

const categories = ["All", "Adventure", "Beach", "City", "Culture", "Mountains"];

export default function FilterBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
      {categories.map((c) => (
        <button key={c}  className={`category-btn ${selectedCategory === c ? "active" : ""}`} onClick={() => onSelectCategory(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
