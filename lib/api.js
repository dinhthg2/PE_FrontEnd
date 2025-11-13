export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchMovies() {
  const res = await fetch(`${API_BASE}/movies`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function fetchMovie(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  if (!res.ok) throw new Error('Failed to fetch movie');
  return res.json();
}

export async function createMovie(formData) {
  const res = await fetch(`${API_BASE}/movies`, { method: 'POST', body: formData });
  return res.json();
}

export async function updateMovie(id, formData) {
  const res = await fetch(`${API_BASE}/movies/${id}`, { method: 'PUT', body: formData });
  return res.json();
}

export async function deleteMovie(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`, { method: 'DELETE' });
  return res.json();
}
