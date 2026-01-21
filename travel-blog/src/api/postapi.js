import axios from "axios";

const API_BASE = "http://localhost:3000/api/posts";

export const fetchPosts = () => axios.get(API_BASE);
export const createPostJson = (payload) => axios.post(API_BASE, payload); // JSON
export const createPostForm = (formData) =>
  axios.post(API_BASE, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deletePost = (id) => axios.delete(`${API_BASE}/${id}`);
export const updatePost = (id, payload) => axios.put(`${API_BASE}/${id}`, payload);
