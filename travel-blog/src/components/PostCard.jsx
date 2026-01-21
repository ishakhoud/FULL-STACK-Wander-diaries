import React from "react";

export default function PostCard({ post, onClick }) {
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer" }} onClick={() => onClick(post)}>
      {post.image && <img src={post.image} alt={post.title} className="card-img-top" style={{ height: 180, objectFit: "cover" }} />}
      <div className="card-body">
        <h6 className="card-title text-purple">{post.title}</h6>
        <p className="small text-muted mb-2">{post.location}</p>
        <p className="text-truncate" style={{ maxHeight: "3.6em" }}>{post.content}</p>
        <div className="mt-2">
          <span className="badge bg-light text-dark">{post.category}</span>
        </div>
      </div>
    </div>
  );
}
