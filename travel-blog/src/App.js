import React from "react";
import Navbar from "./components/Navbar";
import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import "./styles/theme.css"

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <header className="text-center mb-4">
          <h1 className="display-6 fw-bold"style={{marginTop : "150px" , fontSize:"60px" , fontWeight:"20px"}}>Explore the World Through Stories</h1>
          <p className="text-muted">Join me on incredible journeys discovering hidden gems and unforgettable experiences.</p>
        </header>

        <AddPostForm />

        <hr className="my-4" />

        <PostList />
      </main>
    </>
  );
}
