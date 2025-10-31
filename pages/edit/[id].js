import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import PostForm from '../../components/PostForm'
import { fetchPost, updatePost } from '../../lib/api'

export default function Edit() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!id) return
    fetchPost(id).then(p => setPost(p)).catch(err => console.error(err))
  }, [id])

  async function onSubmit(fd) {
    try {
      await updatePost(id, fd)
      router.push('/')
    } catch (e) {
      console.error(e)
      alert('Lỗi khi cập nhật')
    }
  }

  if (!post) return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Đang tải...</h2>
      </div>
    </div>
  )

  return (
    <div className="container">
      <h1>Chỉnh sửa bài viết</h1>
      <Link href="/"><button style={{ marginBottom: 20 }}>Quay lại</button></Link>
      <PostForm initial={post} onSubmit={onSubmit} />
    </div>
  )
}
