import React, { useState } from "react";
import { createPostJson } from "../api/postapi.js";

export default function AddPostForm({ editData, onSubmit }) {
  const [title, setTitle] = useState(editData?.title || "");
  const [content, setContent] = useState(editData?.content || "");
  const [location, setLocation] = useState(editData?.location || "");
  const [category, setCategory] = useState(editData?.category || "");
  const [imageUrl, setImageUrl] = useState(editData?.image || "");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitle("");
    setContent("");
    setLocation("");
    setCategory("");
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !location || !category || !imageUrl) {
      alert("Please fill all fields, including Image URL.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Send JSON data (no multer or file upload)
      await createPostJson({
        title,
        content,
        location,
        category,
        image: imageUrl, // backend expects "image"
      });

      alert("Post created successfully!");
      reset();
      if (onSubmit) onSubmit(); // optional callback
      window.location.reload(); // refresh to see new post
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-4 rounded shadow-sm bg-white" onSubmit={handleSubmit}>
      <h5 className="mb-3 text-purple">Share a New Travel Story</h5>

      <div className="row g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option>Mountains</option>
            <option>Beach</option>
            <option>Culture</option>
            <option>City</option>
            <option>Adventure</option>
          </select>
        </div>

        <div className="col-md-6 mt-2">
          <input
            className="form-control"
            placeholder="Image URL (e.g., https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="col-12 mt-2">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Write your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Publish"}
        </button>
      </div>
    </form>
  );
}
