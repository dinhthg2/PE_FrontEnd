import { useRouter } from 'next/router'
import Link from 'next/link'
import PostForm from '../components/PostForm'
import { createPost } from '../lib/api'

export default function Create() {
  const router = useRouter()

  async function onSubmit(fd) {
    try {
      await createPost(fd)
      router.push('/')
    } catch (e) {
      console.error(e)
      alert('Lỗi khi tạo bài viết')
    }
  }

  return (
    <div className="container">
      <h1>Tạo bài viết mới</h1>
      <Link href="/"><button style={{ marginBottom: 20 }}>Quay lại</button></Link>
      <PostForm onSubmit={onSubmit} />
    </div>
  )
}
