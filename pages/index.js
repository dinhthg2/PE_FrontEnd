import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchMovies, deleteMovie, API_BASE } from '../lib/api'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [q, setQ] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [sort, setSort] = useState('title-asc')

  async function load() {
    try {
      const data = await fetchMovies()
      // Add ratings from localStorage
      const moviesWithRatings = data.map(movie => {
        const savedRating = localStorage.getItem(`movie_rating_${movie.id}`)
        return {
          ...movie,
          rating: savedRating ? parseInt(savedRating) : null
        }
      })
      setMovies(moviesWithRatings)
    } catch (e) {
      console.error(e)
      alert('Error loading movies')
    }
  }

  useEffect(() => { load() }, [])

  // Get unique genres
  const genres = [...new Set(movies.map(m => m.genre).filter(Boolean))]

  let filtered = movies.filter(m => m.title.toLowerCase().includes(q.toLowerCase()))
  if (genreFilter) {
    filtered = filtered.filter(m => m.genre === genreFilter)
  }
  
  filtered.sort((a,b) => {
    if (sort === 'title-asc') return a.title.localeCompare(b.title)
    if (sort === 'title-desc') return b.title.localeCompare(a.title)
    if (sort === 'rating-asc') return (a.rating || 0) - (b.rating || 0)
    if (sort === 'rating-desc') return (b.rating || 0) - (a.rating || 0)
    return 0
  })

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    await deleteMovie(id)
    load()
  }

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="controls">
        <Link href="/create"><button>Add New Movie</button></Link>
        <input type="text" placeholder="Search by movie title..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={genreFilter} onChange={e=>setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="rating-asc">Rating Low → High</option>
          <option value="rating-desc">Rating High → Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>No movies yet</h2>
          <p>Add your first movie</p>
        </div>
      ) : (
        filtered.map(m => (
          <div key={m.id} className="movie">
            <div className="movie-poster">
              {(() => {
                const srcRaw = m.posterUrl || m.poster_url;
                if (!srcRaw) return <span>No poster</span>;
                const imgSrc = srcRaw.startsWith('/') ? `${API_BASE}${srcRaw}` : srcRaw;
                return (
                  <img src={imgSrc} alt={m.title} onError={(e) => e.currentTarget.style.display = 'none'} />
                );
              })()}
            </div>
            <div className="movie-content">
              <h3>{m.title}</h3>
              <p><strong>Genre:</strong> {m.genre || 'Not specified'}</p>
              <p><strong>Rating:</strong> {m.rating ? `${m.rating}/5` : 'Not rated'}</p>
              <div className="movie-actions">
                <Link href={`/edit/${m.id}`}><button className="btn-edit">Edit</button></Link>
                <button onClick={() => handleDelete(m.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
