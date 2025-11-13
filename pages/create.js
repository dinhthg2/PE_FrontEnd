import { useRouter } from 'next/router'
import Link from 'next/link'
import MovieForm from '../components/PostForm'
import { createMovie } from '../lib/api'

export default function Create() {
  const router = useRouter()

  async function onSubmit(fd) {
    try {
      const result = await createMovie(fd)
      const rating = fd.get('rating')
      if (result.id && rating) {
        localStorage.setItem(`movie_rating_${result.id}`, rating)
      }
      router.push('/')
      return result
    } catch (e) {
      console.error(e)
      alert('Error creating movie')
    }
  }

  return (
    <div className="container">
      <h1>Add New Movie</h1>
      <Link href="/"><button style={{ marginBottom: 20 }}>Back</button></Link>
      <MovieForm onSubmit={onSubmit} />
    </div>
  )
}
