import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchPosts, deletePost, API_BASE } from '../lib/api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('desc')

  async function load() {
    try {
      const data = await fetchPosts()
      setPosts(data)
    } catch (e) {
      console.error(e)
      alert('Lỗi khi tải dữ liệu')
    }
  }

  useEffect(() => { load() }, [])

  const filtered = posts.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  filtered.sort((a,b) => {
    if (sort === 'asc') return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  async function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;
    await deletePost(id)
    load()
  }

  return (
    <div className="container">
      <h1>Danh sách bài viết</h1>
      <div className="controls">
        <Link href="/create"><button>Tạo bài viết mới</button></Link>
        <input type="text" placeholder="Tìm theo tên..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="desc">Tên Z-A</option>
          <option value="asc">Tên A-Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>Chưa có bài viết nào</h2>
          <p>Hãy tạo bài viết đầu tiên của bạn</p>
        </div>
      ) : (
        filtered.map(p => (
          <div key={p.id} className="post">
            <div className="post-image">
              {(() => {
                const srcRaw = p.imageUrl || p.image_url;
                if (!srcRaw) return <span>Không có ảnh</span>;
                const imgSrc = srcRaw.startsWith('/') ? `${API_BASE}${srcRaw}` : srcRaw;
                return (
                  <img src={imgSrc} alt={p.name} onError={(e) => e.currentTarget.style.display = 'none'} />
                );
              })()}
            </div>
            <div className="post-content">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="post-actions">
                <Link href={`/edit/${p.id}`}><button className="btn-edit">Sửa</button></Link>
                <button onClick={() => handleDelete(p.id)} className="btn-delete">Xóa</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
