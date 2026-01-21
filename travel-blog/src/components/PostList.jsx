import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost, updatePost } from "../api/postapi.js";
import FilterBar from "./FilterBar";
import PostCard from "./PostCard";
import AddPostForm from "./AddPostForm";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const isAdmin = true;

  const loadPosts = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        console.error(err);
        alert("Error deleting post");
      }
    }
  };

  const filtered =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <>
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="row g-4">
            {filtered.map((post) => (
              <div className="col-md-6" key={post._id}>
                <div className="position-relative">
                  {/* 👇 Pass a click handler to open modal */}
                  <PostCard post={post} onClick={() => setSelectedPost(post)} />

                  {isAdmin && (<div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3 shadow-sm" >
            <div className="d-flex align-items-center">
              <img
                src="https://sp.yimg.com/ib/th/id/OIP.IdA1n0ivVDi2Peyx_RRg_wAAAA?pid=Api&w=148&h=148&c=7&dpr=2&rs=1"
                 style={{ width: "50px", height: "50px", objectFit: "cover" }}
                alt="author"
                className="rounded-circle me-3"
              />
              <div>
                <h6 className="mb-0">Isha Khoud</h6>
                <small className="text-muted">
                  Love to capture moments and explore new places
                </small>
              </div>
            </div>
            <hr />
            <p className="small text-muted">
              Exploring the world one adventure at a time. Sharing travel tips
              and stories.
            </p>
          </div>
        </div>
      </div>

      {/* 🟩 Post Details Modal */}
      {selectedPost && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPost.title}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedPost(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="img-fluid rounded mb-3"
                />
                <p className="text-muted">
                  <strong>Category:</strong> {selectedPost.category}
                </p>
                <p>{selectedPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟨 Edit Post Modal */}
      {editingPost && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setEditingPost(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Post</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditingPost(null)}
                ></button>
              </div>
              <div className="modal-body">
                <AddPostForm
                  editData={editingPost}
                  onSubmit={async (data) => {
                    await updatePost(editingPost._id, data);
                    setEditingPost(null);
                    loadPosts();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
