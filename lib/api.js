export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function createPost(formData) {
  const res = await fetch(`${API_BASE}/posts`, { method: 'POST', body: formData });
  return res.json();
}

export async function updatePost(id, formData) {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'PUT', body: formData });
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  return res.json();
}
