import { useState } from 'react';

export default function MovieForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [genre, setGenre] = useState(initial.genre || '');
  const [rating, setRating] = useState(initial.rating || '');
  const [posterUrl, setPosterUrl] = useState(initial.posterUrl || initial.poster_url || '');
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('genre', genre);
    if (rating) fd.append('rating', rating);
    if (posterUrl) fd.append('posterUrl', posterUrl);
    if (file) fd.append('imageFile', file);
    
    // Save rating to localStorage after successful submit
    onSubmit(fd).then((result) => {
      if (result && rating) {
        localStorage.setItem(`movie_rating_${result.id}`, rating);
      }
    }).catch(console.error);
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Movie Title *</label>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Enter movie title..." 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Genre</label>
        <input 
          type="text" 
          value={genre} 
          onChange={e => setGenre(e.target.value)} 
          placeholder="Action, Comedy, Horror..." 
        />
      </div>
      
      <div className="form-group">
        <label>Rating (1-5)</label>
        <select value={rating} onChange={e => setRating(e.target.value)}>
          <option value="">Select rating...</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Poster URL</label>
        <input 
          type="text" 
          value={posterUrl} 
          onChange={e => setPosterUrl(e.target.value)} 
          placeholder="https://example.com/poster.jpg" 
        />
      </div>

      <div className="form-group">
        <label>Upload Poster</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setFile(e.target.files[0])} 
        />
      </div>
      
      <button type="submit">Save Movie</button>
    </form>
  )
}
