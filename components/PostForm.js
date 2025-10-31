import { useState } from 'react';

export default function PostForm({ initial = {}, onSubmit }) {
  const [name, setName] = useState(initial.name || '');
  const [description, setDescription] = useState(initial.description || '');
  const [imageUrl, setImageUrl] = useState(initial.imageUrl || initial.image_url || '');
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    if (imageUrl) fd.append('imageUrl', imageUrl);
    if (file) fd.append('imageFile', file);
    onSubmit(fd);
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Tên bài viết *</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Nhập tên bài viết..." 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Mô tả *</label>
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Nhập mô tả chi tiết..." 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Link ảnh</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={e => setImageUrl(e.target.value)} 
          placeholder="https://example.com/image.jpg" 
        />
      </div>

      <div className="form-group">
        <label>Upload ảnh</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setFile(e.target.files[0])} 
        />
      </div>
      
      <button type="submit">Lưu bài viết</button>
    </form>
  )
}
