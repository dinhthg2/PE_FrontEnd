import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MovieForm from '../../components/PostForm'
import { fetchMovie, updateMovie } from '../../lib/api'

export default function Edit() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (!id) return
    fetchMovie(id).then(m => {
      const savedRating = localStorage.getItem(`movie_rating_${id}`)
      setMovie({
        ...m,
        rating: savedRating ? parseInt(savedRating) : null
      })
    }).catch(err => console.error(err))
  }, [id])

  async function onSubmit(fd) {
    try {
      const result = await updateMovie(id, fd)
      const rating = fd.get('rating')
      if (rating) {
        localStorage.setItem(`movie_rating_${id}`, rating)
      }
      router.push('/')
      return result
    } catch (e) {
      console.error(e)
      alert('Error updating movie')
    }
  }

  if (!movie) return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Loading...</h2>
      </div>
    </div>
  )

  return (
    <div className="container">
      <h1>Edit Movie</h1>
      <Link href="/"><button style={{ marginBottom: 20 }}>Back</button></Link>
      <MovieForm initial={movie} onSubmit={onSubmit} />
    </div>
  )
}
