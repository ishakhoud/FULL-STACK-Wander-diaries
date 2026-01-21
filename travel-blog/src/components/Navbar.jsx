import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 fixed-top" style={{ background: "rgba(253, 253, 253, 0.8)", 
    backdropFilter: "blur(3px)",}}>
      <div className="container">
        <a className="navbar-brand fw-bold text-purple" href="/"> Wander Dairies💟</a>
        <div className="d-none d-lg-block text-end">
          <small className="text-muted">Travel Blog • Stories & Guides</small>
        </div>
      </div>
    </nav>
  );
}
